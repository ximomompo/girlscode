import React from 'react';
import PropTypes from 'prop-types';
import { Modal, View, StyleSheet } from 'react-native';
import { Icon, Header } from 'react-native-elements';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        flex: 1,
        flexDirection: 'column',
    },
    modal: {
        flex: 7.5,
        backgroundColor: 'white',
    },
});

const ModalC = props => (
    <Modal {...props}>
        <View style={styles.container}>
            <View style={styles.header}>
                <Header
                    leftComponent={
                        <Icon
                            name="times"
                            type="font-awesome"
                            color="#555"
                            onPress={() => props.onClose()}
                        />
                    }
                    centerComponent={{
                        text: props.title,
                        style: {
                            color: '#555',
                        },
                    }}
                    backgroundColor={props.backgroundColor}
                    {...props}
                />
            </View>
            <View style={styles.modal}>
                {props.children}
            </View>
        </View>
    </Modal>
);

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    backgroundColor: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(React.PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

Modal.defaultProps = {
    title: PropTypes.string,
    icon: PropTypes.string,
    backgroundColor: '#FAFAFA',
};

export default ModalC;
