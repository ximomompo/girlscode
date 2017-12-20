import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { primary } from '../../../../helpers/colors';
import styles from '../styles';

const Recommendations = () => (
    <View style={styles.recommendationsMain}>
        <TouchableOpacity
            onPress={() => Actions.pop()}
            style={styles.backButton}
        >
            <Icon
                name="chevron-left"
                type="entypo"
                color={primary}
                iconStyle={{ fontSize: 28 }}
            />
        </TouchableOpacity>
        <Text style={styles.recommendationsTitle}>Recomendaciones</Text>
        <View style={styles.recommendationsCont}>
            <View style={styles.recommendationsIndexCont}>
                <Text style={styles.recommendationsIndexText}>1</Text>
            </View>
            <Text style={styles.recommendationsText}>Utiliza frases cortas y fotos</Text>
        </View>
        <View style={styles.recommendationsCont}>
            <View style={styles.recommendationsIndexCont}>
                <Text style={styles.recommendationsIndexText}>2</Text>
            </View>
            <Text style={styles.recommendationsText}>Luego de cada capítulo, aparecerá una pregunta donde el lector debe tomar una decisión, dependiendo de su respuesta continua la historia o le das un consejo que lo motive a reflexionar.</Text>
        </View>
        <View style={styles.recommendationsCont}>
            <View style={styles.recommendationsIndexCont}>
                <Text style={styles.recommendationsIndexText}>3</Text>
            </View>
            <Text style={styles.recommendationsText}>Termina con un final feliz, a los lectores les encantan</Text>
        </View>
        <View style={styles.recommendationsCont}>
            <View style={styles.recommendationsIndexCont}>
                <Text style={styles.recommendationsIndexText}>4</Text>
            </View>
            <Text style={styles.recommendationsText}>Comparte tu historia en las redes sociales y obtén puntos para ganar el reconocimiento a la "Escritora CódigoNiña más Valorada"</Text>
        </View>
    </View>
);

export default Recommendations;
