import DEFAULT_STYLES_SCENE from './constants';

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
export const text = () => {};
