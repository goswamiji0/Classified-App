/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import splash from '../screens/SplashScreen/splash'
import Login from '../screens/Login/Login'
import Signup from '../screens/Signup/Signup'
import Home from '../screens/BottomTabs/Home/Home'
import Categories from '../screens/BottomTabs/Categories/Categories'
import AddPost from '../screens/BottomTabs/AddPost/AddPost'


import Wishlist from '../screens/BottomTabs/Wishlist/Wishlist'
import Account from '../screens/BottomTabs/Account/Account'
import EditProfile from '../screens/BottomTabs/Account/EditProfile'
import CategoriesDetails from '../screens/BottomTabs/Categories/CategoriesDetails'

import ProductDetails from '../screens/detail/ProductDetails'
import SubCategoriesDetails from '../screens/BottomTabs/Categories/SubCategoriesDetails'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import ImagePath from "../common/ImagePath"
import colors from '../common/colors'
import { StyleSheet, View, Image, Text, } from 'react-native';
import { Drawer, Router, Stack, Scene } from 'react-native-router-flux'
import { color } from 'react-native-reanimated';


const App = () => (
    <Router >
        <Stack key="root">

            <Scene
                key="splash"
                component={splash}
                initial
                hideNavBar />

            <Scene
                key="Login"
                component={Login}
                hideNavBar />
            <Scene
                key="Signup"
                component={Signup}
                hideNavBar />

            <Scene
                key="EditProfile"
                component={EditProfile}
                hideNavBar />



            <Scene
                key="CategoriesDetails"
                component={CategoriesDetails}
                hideNavBar />

            <Scene
                key="ProductDetails"
                component={ProductDetails}
                hideNavBar />
            <Scene
                key="SubCategoriesDetails"
                component={SubCategoriesDetails}
                hideNavBar />


            <Scene key='Tabbar'
                hideNavBar={true}
                showLabel={false}
                tabBarPosition="bottom"
                animationEnabled={true}
                tabBarStyle={{ height: 60 }}
                tabs >





                <Stack
                    key="Home"
                    title="Home"
                    icon={({ focused }) => (
                        <View style={styles.tb_view} >
                            <View style={{ alignItems: 'center' }} >
                             <MaterialCommunityIcons  name={focused ? 'home-variant' : 'home-variant-outline'} color={focused ? colors.actiove_tab : colors.deActive_tab}  size={24} />
                                <Text style={{ color: focused ? colors.actiove_tab : colors.deActive_tab, fontWeight: focused ? "normal" : "normal", marginTop: 3, fontSize: 12 }}>Home</Text>
                            </View>
                        </View>
                    )}
                    hideNavBar
                    navigationBarStyle={{ backgroundColor: 'green'  }}
                    titleStyle={{ color: 'black', alignSelf: 'center' }} >
                    <Scene key='Home'
                        hideNavBar
                        component={Home}
                    />



                </Stack>
                <Stack
                    key="Categories"
                    title="Categories"
                    icon={({ focused }) => (
                        <View style={styles.tb_view} >
                            <View style={{ alignItems: 'center' }} >
                            <MaterialCommunityIcons  name={focused ? 'ballot' : 'ballot-outline'} color={focused ? colors.actiove_tab : colors.deActive_tab}  size={24} />
                                <Text style={{ color: focused ? colors.actiove_tab : colors.deActive_tab, fontWeight: focused ? "normal" : "normal", marginTop: 3, fontSize: 12 }}>Categories</Text>
                            </View>
                        </View>
                    )}
                    hideNavBar
                    navigationBarStyle={{ backgroundColor: 'green' }}
                    titleStyle={{ color: 'black', alignSelf: 'center' }} >
                    <Scene key='Categories'
                        hideNavBar
                        component={Categories}
                    />


                </Stack>
                <Stack
                    key="AddPost"
                    title="AddPost"
                    icon={({ focused }) => (
                        <View style={styles.tb_view} >
                            <View style={{ alignItems: 'center' }} >
                            <MaterialCommunityIcons  name={focused ? 'plus-circle' : 'plus-circle-outline'} color={focused ? colors.actiove_tab : colors.deActive_tab} size={24} />
                                <Text style={{ color: focused ? colors.actiove_tab : colors.deActive_tab, fontWeight: focused ? "normal" : "normal", marginTop: 3, fontSize: 12 }}>Add Post</Text>
                            </View>
                        </View>
                    )}
                    hideNavBar
                    navigationBarStyle={{ backgroundColor: 'green' }}
                    titleStyle={{ color: 'black', alignSelf: 'center' }} >
                    <Scene key='AddPost'
                        hideNavBar
                        component={AddPost}
                    />


                </Stack>
                <Stack
                    key="Wishlist"
                    title="Wishlist"
                    icon={({ focused }) => (
                        <View style={styles.tb_view} >
                            <View style={{ alignItems: 'center' }} >
                            <MaterialCommunityIcons  name={focused ? 'cards-heart' : 'heart-outline'} color={focused ? colors.actiove_tab : colors.deActive_tab}  size={24} />
                                <Text style={{ color: focused ? colors.actiove_tab : colors.deActive_tab, fontWeight: focused ? "normal" : "normal", marginTop: 3, fontSize: 12 }}>Favourites</Text>
                            </View>
                        </View>
                    )}
                    hideNavBar
                    navigationBarStyle={{ backgroundColor: 'green' }}
                    titleStyle={{ color: 'black', alignSelf: 'center' }} >
                    <Scene key='Wishlist'
                        hideNavBar
                        component={Wishlist}
                    />

                </Stack>
                <Stack
                    key="Account"
                    title="Account"
                    icon={({ focused }) => (
                        <View style={styles.tb_view} >
                            <View style={{ alignItems: 'center' }} >
                            <MaterialCommunityIcons  name={focused ? 'account-circle' : 'account-circle-outline'} color={focused ? colors.actiove_tab : colors.deActive_tab} size={24} />
                                <Text style={{ color: focused ? colors.actiove_tab : colors.deActive_tab, fontWeight: focused ? "normal" : "normal", marginTop: 3, fontSize: 12 }}>Account</Text>
                            </View>
                        </View>
                    )}
                    hideNavBar
                    navigationBarStyle={{ backgroundColor: 'green' }}
                    titleStyle={{ color: 'black', alignSelf: 'center' }} >
                    <Scene key='Account'
                        hideNavBar
                        component={Account}
                    />


                </Stack>


            </Scene>


        </Stack>
    </Router >

);
const styles = StyleSheet.create({

    tb_view: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    
    },
    image_css: {
        width: 24, height: 24, resizeMode: 'contain'
    }
});

export default App
