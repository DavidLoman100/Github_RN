# 基于React-Native混合开发的Github客户端APP
打造一款基于React-Native混合开发的Github客户端APP

[![Nodejs](https://img.shields.io/badge/nodejs-v10.15.3-brightgreen.svg)](https://nodejs.org/en/download/)
[![npm](https://img.shields.io/badge/npm-v6.4.1-orange.svg)](https://www.npmjs.com/package/npm)


## 目录

* [下载安装](#下载安装)
* [功能与特性](#功能与特性)
* [技术与框架](#技术与框架)
* [网络编程技术](#网络编程技术)
* [数据存储技术](#数据存储技术)
* [最热模块开发](#最热模块开发)
* [收藏模块开发](#收藏模块开发)
* [我的模块开发](#我的模块开发)
* [运行调试](#运行调试)

## 下载安装
- 请手机扫描二维码下载，目前仅支持安卓手机，IOS以后更新，版本v1.0
![](https://github.com/jackytallow/Github_RN/blob/master/HotGit15x15.png)


## 功能与特性

* 支持订阅多种编程语言;
* 支持添加/删除编程语言，并支持自定义它们的排序;
* 支持收藏喜欢的项目;
* 支持多种颜色主题自由切换;
* 支持搜索,并自持自定义订阅关键字（自定义订阅关键字还未做）;
* 支持分享,轻松将自己喜欢的项目分享给好友（待做）;

## 技术与框架

####  react navigation 3.x,可以参考:[react navigation3.x](https://reactnavigation.org/docs/en/hello-react-navigation.html)
 -  在使用react-navigation3.x的时候，与之前的2.x大概有两种不同
 -   在导入react-navigation的时候2.x版本只需要`npm add`或者`npm install react-navigation`
      不同的是react-navigation3.x版本除了安装`npm install react-navigation`还需要导入`npm add react-native-gesture-handler`
 -  最后需要`react-native link` 将依赖导入到Android平台或者IOS平台
 -   react-navigation 安装后，需要在android包中的MainActivity.java添加以下代码
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
  - 不同的是，React Navigation3.x在创建堆栈导航器的时候，不可用createStackNavigator直接return，需要一个路由配置对象
它是一个Rect组件的返回函数，所以我们需要使用createAPPContainer（xxx）进行处理
`export default createAppContainer(AppNavigator);`
 - 还有一个小改动，React Navigation3.x除了在createStackNavigator使用navigationoptions时，在进行堆栈导航器的时候要使用defaultnavigationoptions，大致代码如下：
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

####  react-native swiper : [☞详情前点击](https://github.com/leecade/react-native-swiper)

####  react-redux : [☞详情前点击](https://react-redux.js.org/)
  - 用户（操作View）发出方式用到dispatch方法
  - Store自动调用reducer，并且传入两个参数（当前State和收到的Action）,Reducer会返回新的State，如果有Middleware
  - State一旦有变化，Store就会调用监听函数，来更新View;
  - 可预测，可维护，可测试
  - [关于redux+navigation的搭建可查看手记](https://www.jianshu.com/p/1af09d80f14c)

#### 值得注意的是，redux在视图层绑定引入了几个概念：
  - <Provider>组件：这个组件需要包裹在整个组件树的最外层。这个组件让根组件的所有子孙组件能够轻松的使用connext()方法绑定store
  -  connect():这是react-redux提供的一个方法。如果一个组件想要响应状态的变化，就把自己作为参数传给connect（）的结果，connect（）方法会处理与store绑定的细节，并通过selector确定该绑定store中哪一部分的数据。
  -  selector: 这是自己编写的一个函数，这个函数声明了你的组件需要整个store中的哪一部分数据作为自己的props
  -  dispatch:每当想要改变应用中的状态时，你就要dispatch一个action，这也是唯一改变状态的方法


#### 离线缓存框架（DataStore）
  - 提升用户体验
  - 节省流量 
  - 可以提高APP的响应速度，本地上其实就是网络请求和本地缓存功能的结合，大致流程图如下：
  ![](https://github.com/jackytallow/Github_RN/blob/master/app-screen/DataStore-Process.png)


#### 基于redux+FlatList实现列表页数据加载
  -  增加了上拉刷新，下拉刷新功能
  -  使用react-native-easy-toast （一款弹窗提示toast组件):[☞详情前点击](https://www.npmjs.com/package/react-native-easy-toast)

####  关于趋势界面使用了第三方开源组件，GitHubTrending
[☞详情前点击](https://github.com/crazycodeboy/GitHubTrending)

####  React-native中自带的WebView组件用于显示网络视图
 -  在state中定义了加载的url与页面缩放方式
 -  在WebView中加载javascript并执行
 -  进行WebView中进行相关物理键返回处理，可以将相关模块单独分离开来，可以通过公共模块的调用，可以在任何界面进行调用
```
/**
 * Android物理回退键处理
 */
export default class BackPressComponent {
    constructor(props) {
        this._hardwareBackPress = this.onHardwareBackPress.bind(this);
        this.props = props;
    }

    componentDidMount() {
        if (this.props.backPress) BackHandler.addEventListener('hardwareBackPress', this._hardwareBackPress);
    }

    componentWillUnmount() {
        if (this.props.backPress) BackHandler.removeEventListener('hardwareBackPress', this._hardwareBackPress);
    }

    onHardwareBackPress(e) {
        return this.props.backPress(e);
    }
}
```


####  在React-native显示html组件可以使用React-native htmlview
[☞详情前点击](https://www.npmjs.com/package/react-native-htmlview)

#### 使用react-native中的modal弹窗组件

#### 优化tabBar的效率，这里使用了DeviceEventEimtter
  - 首先先导入进来，它是在React-native，详细可以查看React-native官方文档
[☞详情前点击](https://facebook.github.io/react-native/docs/native-modules-android#sending-events-to-javascript)
   - 大概实现方式如下：
```
 componentDidMount() {
        this.loadData();
        this.timeSpanChangeListener = DeviceEventEmitter.addListener(EVENT_TYPE_TIME_SPAN_CHANGE,(timeSpan) =>{
            this.timeSpan  = timeSpan;
            this.loadData();
        });
    }
 ```
   -  同时还要调用componentWillUnmount方法进行remove
```
 componentWillUnmount() {
           if (this.timeSpanChangeListener){
               this.timeSpanChangeListener.remove();
           }
    }
```




## 最热模块开发
#### 基于redux + FlatList实现列表页数据加载 
#### 设计最热模块的state树
#### 操作异步action与数据流
#### 动态的设置store和获取store
#### 灵活应用connect
#### action和调用进行交互
#### FaltList的高级应用与加载更多的优化(待完成，加载更多已经完成)



## 收藏模块开发
#### 封装FavoriteDao以及多数据存储设计思想
  - 在FavoriteDao文件对收藏项目进行保存
```
   /**
     * 收藏项目,保存收藏的项目
     * @param key 项目id
     * @param value 收藏的项目
     * @param callback
     */
    saveFavoriteItem(key, value, callback) {
        AsyncStorage.setItem(key, value, (error, result) => {
            if (!error) {//更新Favorite的key
                this.updateFavoriteKeys(key, true);
            }
        });
    }
```
  - 对收藏项目进行更新，删除的方法
```
  /**
     * 更新Favorite key集合
     * @param key
     * @param isAdd true 添加,false 删除
     * **/
    updateFavoriteKeys(key, isAdd) {
        AsyncStorage.getItem(this.favoriteKey, (error, result) => {
            if (!error) {
                let favoriteKeys = [];
                if (result) {
                    favoriteKeys = JSON.parse(result);
                }
                let index = favoriteKeys.indexOf(key);
                if (isAdd) {//如果是添加且key不在存在则添加到数组中
                    if (index === -1) favoriteKeys.push(key);
                } else {//如果是删除且key存在则将其从数值中移除
                    if (index !== -1) favoriteKeys.splice(index, 1);
                }
                AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys));//将更新后的key集合保存到本地
            }
        });
    }

  /**
     * 取消收藏,移除已经收藏的项目
     * @param key 项目 id
     */
    removeFavoriteItem(key) {
        AsyncStorage.removeItem(key, (error, result) => {
            if (!error) {
                this.updateFavoriteKeys(key, false);
            }
        });
    }
```    
  
####  使用React的tatic-lifecycle-method
 - 这里需要注意的是新版做了相应的变动，将之前的函数变更了一下
[详情请看GitHub上的项目](https://github.com/reactjs/rfcs/blob/master/text/0006-static-lifecycle-methods.md)
 - 大致变动如下，在新版本已经使用getDerivedStateFromProps方法：
```
 static getDerivedStateFromProps(nextProps, prevState) {
    // Called after a component is instantiated or before it receives new props.
    // Return an object to update state in response to prop changes.
    // Return null to indicate no change to state.
  }
```

#### 封装与继承BaseItem实现代码复用
  - 因为发现收藏功能在最热模块和趋势模块都要用到，所以在Poularitem和TrendingItem进行复用BaseItem

####  妙用callback解决Item跨组件,在详情页和列表页改变收藏状态时，可以实时变更
 - 在点击的时候传入回调callback
```
         onSelect={(callback)=>{
                NavigationUtil.goPage({
                    projectModel: item,
                    flag:FLAG_STORAGE.flag_trending,
                    callback,
                    },'DetailPage');
            }}
```
 - 并且在详情页面，进行接收callback，更新item当前状态
```
 const {projectModel,callback}=this.params;
        const isFavorite=projectModel.isFavorite=!projectModel.isFavorite;
        callback(isFavorite);//更新Item的收藏状态
```

####  跨界面通讯解决方案EventBus的使用
 - 需要用到第三方组件，要导入进来`npm i react-native-event-bus --save`
 [详情使用请查看GitHub](https://github.com/crazycodeboy/react-native-event-bus)


## 我的模块开发
####  开发我的模块中我的列表页面
####  对WebView进行深度封装，实现简易浏览器
####  基于组装者模式进行封装关于页面
 - 需要使用到react-native-parallax-scroll-view第三方组件
 - [详情前点击☞](https://github.com/i6mi6/react-native-parallax-scroll-view)
 - Linking 第三方邮箱发送插件
```
import {Linking} from 'react-native';
 const url = 'mailto:3434481891@qq.com';
                Linking.canOpenURL(url)
                    .then(support => {
                        if (!support) {
                            console.log('Can\'t handle url: ' + url);
                        } else {
                            Linking.openURL(url);
                        }
                    }).catch(e => {
                    console.error('An error occurred', e);
                });
                break;
 ```   

 - 调用React-native中的Clipboard复制剪切板
```
     Clipboard.setString(tab.account);
      this.toast.show(tab.title + tab.account + '已复制到剪切板。');
```
 
#### 定制化主题开发
- 包括可定制化标签选择功能，使用了如下组件
- react-native-checked-box[☞详情前点击](https://www.npmjs.com/package/react-native-check-box)

#### 实现拖拽排序功能
- react-native-sortable-listview[☞详情前点击](https://www.npmjs.com/package/react-native-sortable-listview)


## 网络编程技术
#### RN使用Fetch进行网络请求，Fetch在我看来，可与XMLHttpRequest相媲美

#### fetch规范于JQuery.ajax()主要有两种方式的不同
 * 当收到代表错误的HTTP状态码，不会被标记为reject,状态码会变为404或500，它会将Promise状态标记为resolve
 * 默认情况下，fetch不会从服务端发送或者接收任何cookies，如果依赖于用户session，则会导致未经认证的请求
 * react-native 提供了全局的fetch函数作为替代xhr的网络通讯模块。之所以这么选择是由于xhr存在以下的缺点：
 * 设计上不符合责任分离原则，将输入、输出和用事件来跟踪的状态混杂在一个对象里。
 * 与最近的promise以及基于生成器的异步编程模型不太搭。
 
#### 使用的api
 - 开始时使用nodejs进行后台数据调用，后来发现Github官网数据太过庞大，所以直接使用了它的开源Api
 - 需要注意的是GitHub官网只提供了最热页面的数据，所以趋势界面我是用了别人封装好并且已经上传到RN上的开源组件，调用方式不发生改变，需要导入
- URL:https://api.github.com/search/repositories?
- 查询所有的:q=stars:>1&sort=stars
- 分类查询：q=ios&sort=stars
```
  var API_URL ='https://api.github.com/search/repositories?q=ios&sort=stars';
  var API_URL ='https://api.github.com/search/repositories?q=stars:>1&sort=stars';
```

##  数据存储技术

#### 这里我们使用AsyncStorage
   - 简单的，异步的，持久化的key-value存储系统
   - AsyncStorage也是React Navtive官方推荐的数据存储方式
   - IOS平台中会使用原生代码将AsyncStorage中的小数据存储于序列化的字典数据结构中，大数据存储于单独的文件中
   - Androd平台会将AsyncStorage存储于RocksDB或者Sqlite中

#### [AsyncStorage的使用，详情前点击☞](https://facebook.github.io/react-native/docs/getting-started)


##  运行调试

####  准备React Native环境,可参考: [Requirements](https://facebook.github.io/react-native/docs/getting-started.html#requirements)。
#### Clone 之后，然后终端进入项目根目录。
####  终端运行 `npm install`。
#### 然后运行 `react-native run-ios` 或 `react-native run-android`。

