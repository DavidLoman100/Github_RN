import React, {Component} from 'react';
import {Image,StyleSheet,Text,View,TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {PropTypes} from 'prop-types';

/**
 * 封装了一些公共逻辑的处理
 */
export default class BaseItem extends Component {
    static propTypes = {
        projectModel: PropTypes.object,
        onSelect: PropTypes.func,
        onFavorite: PropTypes.func,
    };
   constructor(props){
       super(props);
       this.state={
           isFavorite: this.props.projectModel.isFavorite,
       }
   }

    /**
     * 牢记：https://github.com/reactjs/rfcs/blob/master/text/0006-static-lifecycle-methods.md
     * componentWillReceiveProps在新版React中不能再用了
     * @param nextProps
     * @param prevState
     * @returns {*}
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        const isFavorite = nextProps.projectModel.isFavorite;
        if (prevState.isFavorite !== isFavorite) {
            return {
                isFavorite: isFavorite,
            };
        }
        return null;
    }


    setFavoriteSate(isFavorite){
        this.props.projectModel.isFavorite = isFavorite;
        this.setState({
            isFavorite: isFavorite,
        })
    }

    //刷新item状态
    onItemClick() {
        this.props.onSelect(isFavorite => {
            this.setFavoriteSate(isFavorite);
        });
    }


    onPressFavorite(){
         this.setFavoriteSate(!this.state.isFavorite);
         this.props.onFavorite(this.props.projectModel.item,!this.state.isFavorite);
    }


    _favoriteIcon(){
        const {theme} = this.props;
        return <TouchableOpacity
          sylte={{padding:6}}
           underlayColor='transparent'
           onPress={() => this.onPressFavorite()}
        >
            <FontAwesome
                name={this.state.isFavorite ? 'star' : 'star-o'}
                size={26}
                style={{color: theme.themeColor}}
            />
        </TouchableOpacity>
    }
}


