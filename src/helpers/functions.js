import firebase from 'react-native-firebase';
import { DEFAULT_STYLES_SCENE, VALUE_SCENE_PUBLISHED } from './constants';


const uploadFile = (path, image) => (
    new Promise((resolve, reject) => {
        // const task = firebase.storage().ref('playbooks')
        //     .child(key)
        //     .child(sceneKey)
        //     .put(image);

        const task = firebase.storage().ref(path)
            .put(image);

        task.on('state_changed', () => {
            // console.log('state', snapFile.state);
        }, (error) => {
            console.log('error', error);
            reject(error);
        }, (res) => {
            resolve(res.downloadURL);
        });
    })
);

export const getFormattedStylesText = (styles) => {
    if (!styles) return DEFAULT_STYLES_SCENE;
    const dataStyles = {
        left: styles.left || DEFAULT_STYLES_SCENE.left,
        top: styles.top || DEFAULT_STYLES_SCENE.top,
        color: styles.color || DEFAULT_STYLES_SCENE.color,
    };
    if (!styles.transform) {
        return Object.assign({}, dataStyles, {
            transform: [
                { rotate: '0deg' },
                { scale: 1 },
            ],
        });
    }
    return Object.assign({}, dataStyles, {
        transform: [
            { rotate: styles.transform.rotate },
            { scale: styles.transform.scale },
        ],
    });
};
export const publishPlaybook = async (key) => {
    const snap = await firebase.database().ref('building_playbooks').child(key).once('value');

    if (!snap.val().title) {
        throw new Error({
            type: 'alert',
            title: 'Título necesario',
            message: 'Debes añadir escribir un título para tu playbook',
        });
    }

    if (!snap.val().category) {
        throw new Error({
            type: 'alert',
            title: 'Categoría necesaria',
            message: 'Debes asignar una categoría a tu playbook',
        });
    }

    const categoryKey = snap.val().category.id;
    const numScenes = snap.val().numScenes;
    const dataTimeline = {
        type: 'playbook',
        created_at: firebase.database.ServerValue.TIMESTAMP,
        key,
        status: 'pristine',
        owner_id: firebase.auth().currentUser.uid,
        meta: {
            title: snap.val().title,
            name: firebase.auth().currentUser.displayName,
            photoURL: firebase.auth().currentUser.photoURL,
            category: snap.val().category,
            percentage: 0,
        },
    };

    await snap.ref.child('publishing').set(true);
            
    // subir imagenes
    await snap.child('scenes').forEach(async (snapScene) => {
        if (snapScene.val().finished_at) {
            try {
                const pathImage = await uploadFile(snapScene.key, snapScene.val().image);
                await snapScene.ref.child('imageURL').set(pathImage);
            } catch (error) {
                console.log(`UPLOAD FAIL: image scene ${snapScene.key}`);
            }
        }
    });

    try {
        const pathImage = await uploadFile('done', snap.val().done_scene.image);
        await snap.ref.child('done_scene').child('imageURL').set(pathImage);
    } catch (error) {
        console.log('UPLOAD FAIL: image done scene', error);
    }

    try {
        const pathImage = await uploadFile('error', snap.val().error_scene.image);
        await snap.ref.child('error_scene').child('imageURL').set(pathImage);
    } catch (error) {
        console.log('UPLOAD FAIL: image error scene', error);
    }

    // migrar de building_playbooks to publish_playbooks
    const snapCopy = await snap.ref.once('value');
    const dataCopy = Object.assign({}, snapCopy.val(), {
        published_at: firebase.database.ServerValue.TIMESTAMP,
        numPlays: 0,
        averageReviews: null,
    });
    await firebase.database().ref('publish_playbooks').child(key).set(dataCopy);

    // Añadir el playbook al usuario logueado y redirigir.
    await firebase.database().ref('users_timeline')
        .child(firebase.auth().currentUser.uid)
        .child(key)
        .set(dataTimeline);

    await snap.ref.child('publishing').set(false);

    // eliminar todos los building_playbooks del propietario
    // await firebase.database().ref('building_playbooks')
    //     .orderByChild('owner_id')
    //     .equalTo(firebase.auth().currentUser.uid)
    //     .once('value', (snapBP) => {
    //         snapBP.forEach((snapBPChild) => {
    //             snapBPChild.ref.remove();
    //         });
    //     });

    // Añadir el playbook a todos los timelines de los usuarios.
    firebase.database().ref('users')
        .once('value', (snapUsers) => {
            snapUsers.forEach((snapUserChild) => {
                if (snapUserChild.key !== firebase.auth().currentUser.uid) {
                    firebase.database().ref('users_timeline')
                        .child(snapUserChild.key)
                        .child(key)
                        .set(dataTimeline);
                }
            });
        });

    // Actualizar los puntos de categoria del usuario.
    firebase.database().ref('users_categories')
        .child(firebase.auth().currentUser.uid)
        .child(categoryKey)
        .once('value', (snapUserCat) => {
            const points = VALUE_SCENE_PUBLISHED * numScenes;
            snapUserCat.ref.child('points').set(snapUserCat.val().points + points);
            snapUserCat.ref.child('logs').push({
                points,
                created_at: firebase.database.ServerValue.TIMESTAMP,
                type: 'published',
                playbook_key: key,
            });
        });

    return snap.ref.off();
};

