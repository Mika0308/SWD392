// import React, { useState } from 'react';
// import { Dimensions, StyleSheet, View, Image } from 'react-native';
// import Carousel from 'react-native-reanimated-carousel';

// export default function AppCarousel() {
//     const [pagingEnabled, setPagingEnabled] = useState(true);
//     const width = Dimensions.get('window').width;

//     const list = [
//         { id: 1, title: 'First Item', image: require('./images/1.jpg') },
//         { id: 2, title: 'Second Item', image: require('./images/2.jpg') },
//         { id: 3, title: 'Third Item', image: require('./images/3.jpg') },
//         // Uncomment these lines if you want more items:
//         // { id: 4, title: 'Fourth Item', image: require('./images/4.jpg') },
//         // { id: 5, title: 'Fifth Item', image: require('./images/5.jpg') },
//         // { id: 6, title: 'Sixth Item', image: require('./images/6.jpg') },
//     ];

//     return (
//         <View style={{ flex: 1 }}>
//             <Carousel
//                 width={width}
//                 height={width / 2}
//                 data={list}
//                 autoPlay={true}
//                 pagingEnabled={pagingEnabled}
//                 scrollAnimationDuration={1000} // Duration for the scroll animation
//                 autoPlayInterval={2000} // Interval between auto plays
//                 loop={true} // Enable looping
//                 renderItem={({ item }) => (
//                     <View style={styles.CarouselItem}>
//                         <Image style={styles.img} source={item.image} />
//                     </View>
//                 )}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     CarouselItem: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center', // Centering image within the container
//         overflow: 'hidden',
//     },
//     img: {
//         width: '100%',
//         height: '100%',
//         resizeMode: 'cover', // Ensure the image scales correctly
//     },
// });
