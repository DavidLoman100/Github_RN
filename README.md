# Github_RN
打造一款基于React-Native混合开发的Github客户端APP

[![Nodejs](https://img.shields.io/badge/Download-v1.0.3-ff69b4.svg)](https://nodejs.org/en/download/)
[![npm](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](https://www.npmjs.com/package/npm)


## 目录

* [功能与特性](#功能与特性)
* [技术与框架](#技术与框架)
* [运行调试](#运行调式)


## 功能与特性

* 支持订阅多种编程语言;
* 支持添加/删除编程语言，并支持自定义它们的排序;
* 支持收藏喜欢的项目;
* 支持多种颜色主题自由切换;
* 支持搜索,并自持自定义订阅关键字;
* 支持分享,轻松将自己喜欢的项目分享给好友;

## 技术与框架

* react navigation 3.x,可以参考:[react navigation3.x](https://reactnavigation.org/docs/en/hello-react-navigation.html)
1. 在使用react-navigation3.x的时候，与之前的2.x大概有两种不同
- 在导入react-navigation的时候2.x版本只需要`npm add`或者`npm install react-navigation`
- 不同的是react-navigation3.x版本除了安装`npm install react-navigation`还需要导入`npm add react-native-gesture-handler`
- 最后需要`react-native link` 将依赖导入到Android平台或者IOS平台
2. react-navigation 安装后，需要在android包中的MainActivity.java添加以下代码
```
package com.reactnavigation.example;

import com.facebook.react.ReactActivity;
 import com.facebook.react.ReactActivityDelegate;
 import com.facebook.react.ReactRootView;
 import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "you project name";
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
       return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
}
}
```
3. 不同的是，React Navigation3.x在创建堆栈导航器的时候，不可用createStackNavigator直接return，需要一个路由配置对象
它是一个Rect组件的返回函数，所以我们需要使用createAPPContainer（xxx）进行处理
`export default createAppContainer(AppNavigator);`
4. 还有一个小改动，React Navigation3.x除了在createStackNavigator使用navigationoptions时，在进行堆栈导航器的时候要使用defaultnavigationoptions，大致代码如下：
```
export  default createAppContainer(createSwitchNavigator({
    Init:{
        screen:InitNavigator
    },
    Splash:{
        screen:SplashNavigator
    },
    Main:{
        screen:MainNavigator
    } },{
            defaultNavigationOptions:{
                header:null //将header设为null
            }
    }));
```
* react-native swiper : [详情前点击☞](https://github.com/leecade/react-native-swiper)
* react-redux : [详情前点击☞](https://react-redux.js.org/)


##  运行调试

1. 准备React Native环境,可参考: [Requirements](https://facebook.github.io/react-native/docs/getting-started.html#requirements)。
2. Clone 之后，然后终端进入项目根目录。
3. 终端运行 `npm install`。
4. 然后运行 `react-native run-ios` 或 `react-native run-android`。
