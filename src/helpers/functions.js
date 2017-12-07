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

const uploadScenes = snapPb => (
    new Promise((res) => {
        const promises = [];
        snapPb.child('scenes').forEach((snapScene) => {
            if (snapScene.val().finished_at) {
                promises.push(
                    uploadFile(`playbooks/${snapPb.key}/${snapScene.key}`, snapScene.val().image)
                        .then(pathImage => (
                            new Promise((resolve) => {
                                snapScene.ref.child('imageURL').set(pathImage).then(() => {
                                    resolve();
                                });
                            })
                        )),
                );
                if (snapScene.val().errorScene) {
                    promises.push(
                        uploadFile(`playbooks/${snapPb.key}/${snapScene.key}_error`, snapScene.val().errorScene.image)
                            .then(pathImage => (
                                new Promise((resolve) => {
                                    snapScene.ref.child('errorScene').child('imageURL').set(pathImage).then(() => {
                                        resolve();
                                    });
                                })
                            )),
                    );
                }
            }
        });
        return Promise.all(promises).then(() => {
            res();
        });
    })
);

export const publishPlaybook = async (key) => {
    const snap = await firebase.database().ref('building_playbooks').child(key).once('value');

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

