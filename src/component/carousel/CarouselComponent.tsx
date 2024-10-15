// import { View, Dimensions, StyleSheet, Text } from 'react-native';
// import Carousel from 'react-native-snap-carousel';

// const data = [
//     { title: 'Cao Cấp 1', description: 'Bài toán cao cấp về đại số tuyến tính.' },
//     { title: 'Cao Cấp 2', description: 'Bài toán cao cấp về giải tích.' },
//     { title: 'Toán Hình 1', description: 'Bài toán hình học cơ bản.' },
//     { title: 'Toán Hình 2', description: 'Bài toán hình học nâng cao.' },
// ];

// const CarouselComponent = () => {
//     const windowWidth = Dimensions.get('window').width;

//     return (
//         <View style={styles.carouselContainer}>
//             <Carousel
//                 data={data}
//                 renderItem={({ item }) => (
//                     <View style={styles.card}>
//                         <Text>{item.title}</Text>
//                         <Text>{item.description}</Text>
//                     </View>
//                 )}
//                 sliderWidth={windowWidth}
//                 itemWidth={250}
//                 loop={true}
//                 autoplay={true}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     carouselContainer: {
//         marginTop: 20,
//     },
//     card: {
//         backgroundColor: '#fff',
//         borderRadius: 10,
//         padding: 20,
//         shadowColor: '#000',
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//         elevation: 2,
//     },
// });

// export default CarouselComponent;
