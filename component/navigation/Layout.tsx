// import { Tabs } from "expo-router"; // Check if you need to import { Tab } from "expo-router";
// import { View } from "react-native";
// import { IoHome, IoSearch, IoWallet, IoPerson, IoAdd } from 'react-icons/io5';
// import HomeScreen from '../screens/HomeScreen';  // Adjust the path as necessary
// import ChatScreen from '../screens/ChatScreen';  // Adjust the path as necessary
// import SearchScreen from '../screens/SearchScreen';  // Adjust the path as necessary
// import ProfileScreen from '../screens/ProfileScreen';  // Adjust the path as necessary
// import WalletScreen from '../screens/WalletScreen';  // Adjust the path as necessary


// const ACTIVE_COLOR = "blue";
// const INACTIVE_COLOR = "#888"; // Example inactive color

// export default function Layout() {
//     return (
//         <Tabs
//             screenOptions={{
//                 headerShown: false,
//                 tabBarShowLabel: false,
//                 tabBarStyle: {
//                     position: "absolute",
//                     bottom: 27,
//                     left: 16,
//                     right: 16,
//                     height: 72,
//                     elevation: 0,
//                     backgroundColor: "white",
//                     borderRadius: 16,
//                     alignItems: "center",
//                     justifyContent: "center",
//                 }
//             }}
//         >
//             <Tabs.Screen
//                 name="home"
//                 component={HomeScreen}
//                 options={{
//                     tabBarIcon: ({ focused }) => (
//                         <View style={{ alignItems: "center", paddingTop: 10 }}>
//                             <IoHome size={24} color={focused ? ACTIVE_COLOR : INACTIVE_COLOR} />
//                         </View>
//                     )
//                 }}
//             />
//             <Tabs.Screen
//                 name="search"
//                 options={{
//                     tabBarIcon: ({ focused }) => (
//                         <View style={{ alignItems: "center", paddingTop: 10 }}>
//                             <IoSearch size={24} color={focused ? ACTIVE_COLOR : INACTIVE_COLOR} />
//                         </View>
//                     )
//                 }}
//             />
//             <Tabs.Screen
//                 name="chat"
//                 options={{
//                     tabBarIcon: ({ focused }) => (
//                         <View style={{
//                             alignItems: "center",
//                             justifyContent: "center",
//                             height: 56,
//                             width: 56,
//                             borderRadius: 999,
//                             backgroundColor: focused ? ACTIVE_COLOR : "transparent"
//                         }}>
//                             <IoAdd size={24} color={focused ? "white" : ACTIVE_COLOR} />
//                         </View>
//                     )
//                 }}
//             />
//             <Tabs.Screen
//                 name="wallet"
//                 options={{
//                     tabBarIcon: ({ focused }) => (
//                         <View style={{ alignItems: "center", paddingTop: 10 }}>
//                             <IoWallet size={24} color={focused ? ACTIVE_COLOR : INACTIVE_COLOR} />
//                         </View>
//                     )
//                 }}
//             />
//             <Tabs.Screen
//                 name="profile"
//                 options={{
//                     tabBarIcon: ({ focused }) => (
//                         <View style={{ alignItems: "center", paddingTop: 10 }}>
//                             <IoPerson size={24} color={focused ? ACTIVE_COLOR : INACTIVE_COLOR} />
//                         </View>
//                     )
//                 }}
//             />
//         </Tabs>
//     );
// }
