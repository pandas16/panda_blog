---
title: 'react 无状态组件与纯组件（pureComponent）'
date: 2018-09-20 14:18:44
author: '非動ご'
tags:
 - react
---

## 无状态组件与纯组件（pureComponent）

### 1.1 无状态组件

无状态组件可以通过减少继承`Component`而来的生命周期函数而达到性能优化的效果。从本质上来说，无状态组件就是一个单纯的`render`函数，所以无状态组件的缺点也是显而易见的。因为它没有`shouldComponentUpdate`生命周期函数，所以每次`state`更新，它都会重新绘制`render`函数。

原则上，只要一个组件只具有`render`函数时，都可以封装成无状态组件，但是我认为其较佳的使用场景应该是使用在`ListView`组件的`renderRow`函数内部，因为每次对`ListView`组件的数据进行操作，都会不可避免的调用`renderRow`函数，而这时无状态组件无生命周期的特性恰好能有效的显示出来。虽然此时是否将`renderRow`里面的组件拆分出来在效果上都是一样的，但是组件的拆分有利于降低耦合，也有利于隔离这些单元进行独立测试。

**无状态组件示例：**

```javascript
// 注意:props属性全部写在'{}'里面，也可以只传入‘props’,
// 这里就不用写‘render’函数了
const SubItem = ({rowData,index,updateItem}) => {
    console.log('SubItem.render',rowData.uername);
    return (
        <View style={styles.itemStyle}>
            <TouchableOpacity onPress={()=>updateItem(index)} style={styles.updataBtn}>
                <Text style={styles.baseText}>{rowData.uername||''}</Text>
                <Text style={{fontSize:12,color:'#fff',paddingLeft:20}}>{'点我修改'}</Text>
            </TouchableOpacity>
            <Text style={styles.baseText}>{rowData.useid||''}</Text>
            <Text style={styles.baseText}>{rowData.remark||'暂无备注'}</Text>
        </View>
    );
}
```

**完整的示例代码：**
```javascript
'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity,
} from 'react-native';

const defaultSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
const testData = [{uername:'谢广坤',useid:'w1258536653',remark:'这是一条备注信息'},
    {uername:'王小绿',useid:'1258012580',remark:''},
    {uername:'肖宏',useid:'3215532155',remark:'宵小消失'},
    {uername:'李逸',useid:'1008610086',remark:'木子李'}];

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: defaultSource,
        };
        this.listData = [];
    }

    componentDidMount() {
        this.listData = JSON.parse(JSON.stringify(testData));
        this.setState({
            dataSource: defaultSource.cloneWithRows(testData),
        });
    }

    updateItem = (index) => {
        if (this.listData[index].username == '李明') {
            return;
        }
        this.listData[index].username = '李明';
        this.setState({
            dataSource: defaultSource.cloneWithRows(this.listData),
        });
    } 

    renderRow = (rowData,i,j) => {
        console.log('renderRow',rowData.uername);
        return (
            <SubItem rowData={rowData} updateItem={this.updateItem} index={j}/>
        )
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:"#faf7f7"}}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}/>
            </View>
        )
    }
}

const SubItem = ({rowData,index,updateItem,}) => {
    console.log('SubItem.render',rowData.uername);
    return (
        <View style={styles.itemStyle}>
            <TouchableOpacity onPress={()=>updateItem(index)} style={styles.updataBtn}>
                <Text style={styles.baseText}>{rowData.uername||''}</Text>
                <Text style={{fontSize:12,color:'#fff',paddingLeft:20}}>{'点我修改'}</Text>
            </TouchableOpacity>
            <Text style={styles.baseText}>{rowData.useid||''}</Text>
            <Text style={styles.baseText}>{rowData.remark||'暂无备注'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    itemStyle: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#fff',
        marginBottom: 5,
    },
    baseText: {
        fontSize: 14,
        color: '#000',
    },
    updataBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#58A0FF',
    }
});
```

**运行效果图如下：**

![在这里插入图片描述](https://img-blog.csdn.net/20180920111721391?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3IxMjI1NTU=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

点击任意一项的“点我修改”按钮，通过下图可以看出，`renderRow`重绘了四次，并且`SubItem`也重新绘制了4次。但是因为`SubItem`为无状态组件，因此减少了声明周期函数的消耗。

![在这里插入图片描述](https://img-blog.csdn.net/20180920115930907?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3IxMjI1NTU=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

上文也提到了，虽然此时是否将`renderRow`里面的组件拆分出来在效果上都是一样的，但是组件的拆分有利于降低耦合，也有利于隔离这些单元进行独立测试，因此组件的拆分对于整个软件开发的进行还是有利的。

### 1.2 PureComponent

纯组件是通过控制`shouldComponentUpdate`生命周期函数，减少`render`调用次数来减少性能损耗的。这相对于`Component`来说，减少了手动判断`state`变化的繁琐操作，但该组件也具有一定的缺陷，因为它只能进行一层浅比较，简单来说，它只比较`props`和`state`的内存地址，如果内存地址相同，则`shouldComponentUpdate`生命周期就返回`false`。`PureComponent`的使用场景应该是局部数据发生改变的场景，比如带有输入框、`switch`开关等的UI组件就可以使用`PureComponent`组件封装。`PureComponent`中如果有数据操作最好配合一个第三方组件——`Immutable`一起使用，`Immutable`需要使用npm安装该插件才可以使用，因为`Immutable`可以保证数据的不变性。

**PureComponent示例：** 以下将输入框组件使用`PureComponent`进行了封装。

```javascript
'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountNum: '',
            initPassword: '',
            userName: '',
        };
    }

    componentDidMount() {
    }

    onChangeText = (text, label) => {
        this.setState({[label]:text});
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:"#faf7f7"}}>
                <InputItem label={'账号:'} holder={'请输入账号'} itemValue={this.state.accountNum} handleChangeText={this.onChangeText} keyboardType={'default'}/>
                <InputItem label={'初始密码:'} holder={'请输入初始密码'} itemValue={this.state.initPassword} handleChangeText={this.onChangeText} keyboardType={'numeric'}/>
                <InputItem label={'姓名:'} holder={'请输入姓名'} itemValue={this.state.userName} handleChangeText={this.onChangeText} keyboardType={'default'}/>
            </View>
        )
    }
}

class InputItem extends React.PureComponent {
    render() {
        let {label,holder,itemValue,handleChangeText,keyboardType} = this.props;
        console.log('renderInputItem',itemValue);
        return (
            <View style={styles.inputItemContainer}>
                <Text style={{fontSize:14,color:'#000'}}>{label}</Text>
                <TextInput
                    style={styles.customerInput}
                    underlineColorAndroid={"transparent"}
                    placeholderTextColor={"#cdcdcd"}
                    placeholder={holder}
                    defaultValue={itemValue}
                    keyboardType={keyboardType}
                    onChangeText={(text)=>handleChangeText(text,itemValue)}
                    numberOfLines={1}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputItemContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 14,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    customerInput: {
        flex: 1,
        minHeight: 25,
        paddingHorizontal: 10,
        paddingVertical: 0,
        textAlign: 'right',
        fontSize: 14,
        color: '#333',
    },
});
```

我们都对在输入框中输入内容，`InputItem`也没有进行重绘。

**运行效果图如下：** 

![在这里插入图片描述](https://img-blog.csdn.net/20180920140030979?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3IxMjI1NTU=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

**控制台打印如下：** 

![在这里插入图片描述](https://img-blog.csdn.net/20180920140230610?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3IxMjI1NTU=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

这里如果我们不使用`PureComponent`，则会多次调用render函数，造成无意义的资源浪费。如果我们封装的是其它的组件，比如`Switch`，则也只有state被修改的那一项被修改，感兴趣的童鞋可以动手自己试一下。

### 总结：

 1. 一般来说，如果一个组件只有`render`函数，则该组件可以封装成无状态组件。
 2. 在`renderRow`函数中比较适合使用无状态组件。
 3. 在大部分的时候都可以使用`pureComponent`组件来替换`Component`。

