import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, View, Image } from 'react-native';
import Carousel from '../../../components/Carousel/Carousel';
import images from '../../../config/images';
import styles from './styles';

const slides = [
  {
    key: 'bemVindo',
    title: 'Bem vindo ao React Native Project',
    text: 'Agora você tem acesso às informações das fazendas de onde estiver',
    image: images.onboarding.fazendas,
  }, {
    key: 'filtro',
    title: 'Aproveite para filtrar',
    text: 'Você pode filtrar as fazendas por área e ordenar o resultado de acordo com a próxima vistoria.',
    image: images.onboarding.filtro,
  }, {
    key: 'busca',
    title: 'Busca por fazenda',
    text: 'Utilize a busca para encontrar com mais facilidade o que você procura.',
    image: images.onboarding.busca,
  }, {
    key: 'detalhes',
    title: 'Fazenda',
    text: 'Agora você também poderá visualizar as informações da fazenda e histórico de vistorias.',
    image: images.onboarding.detalhes,
  },
];

export default class OnboardingView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderItem = item => (
    <View key={item.key} style={styles.mainContent}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.containerLabels}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </View>
  )

  onDone = () => {
    Actions.replace('fazendas');
  }

  render() {
    return (
      <View style={styles.container}>
        <Carousel
          showPagination
          nextLabel="Próximo"
          doneLabel="Começar"
          onDone={this.onDone}
        >
          {
            slides.map(item => this.renderItem(item))
          }
        </Carousel>
      </View>
    );
  }
}
