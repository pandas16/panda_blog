---
title: 'react native Text组件首行缩进'
date: 2019-07-18 09:47:25
author: '非動ご'
tags:
 - react
---

中文段落一般都会有首行缩进。然而react native的Text组件并没有直接提供相关的配置属性。

在最近的开发中遇到了一个看似简单的需求，要实现如下图的效果

![在这里插入图片描述](https://img-blog.csdnimg.cn/2019071717492549.png)

重点是需要在标题的左边添加一个分类的标识，而这个标识不能直接使用Text嵌套实现。因为这个标识区域是有边框的。

有人可能会问为什么不直接使用`marginLeft`呢？那将会是另一种效果，如下图所示

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190717175821166.png)

为了实现上述需求，我的思路是对标题进行首行缩进，空出相应的空间进行标识的绘制。

### 空格占位符
空格占位符相对于Text组件内的字符串来说可以根据情况设置不同的缩进宽度。比如常见的首行缩进2字符，就可以使用`&emsp;&emsp;`来进行设置。以下是不同宽度的空格占位符的清单：

```
&#32; == 普通的英文半角空格
&#160; == &nbsp; == &#xA0; == no-break space （普通的英文半角空格但不换行）
&#12288; == 中文全角空格 （一个中文宽度）
&#8194; == &ensp; == en空格 （半个中文宽度）
&#8195; == &emsp; == em空格 （一个中文宽度）
&#8197; == 四分之一em空格 （四分之一中文宽度）
```

#### 使用方法
```javascript
<Text> &emsp;&emsp;
    {`这是一个文本。slice(start,end) 方法用于提取字符串的某个部分（从参数 start 到 end 位置），并以新的字符串返回被提取的部分。类似 substring()。`}
</Text>
```

#### 说明：

占位符不能在Text组件的`“{}”`中使用。
占位符之后一定要添加`“；”`。

### 案例

```javascript
<View style={{flexDirection:'row',alignItems:'center'}}>
    <Text style={styles.titleStyle} numberOfLines={2}>&emsp;&emsp;&ensp;{`测试标题，这个标题可以很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长`}</Text>
    <View style={styles.classNameBox}>
        <Text style={{fontSize:Size(12),color:'#4595FF'}} numberOfLines={1}>
            {`${classname&&classname.slice(0,2)}`}
        </Text>
    </View>
</View>

titleStyle:{
    flex: 1,
    color:"#28314E",
    fontSize:Size(18),
    lineHeight:22,
    marginVertical:Size(15),
    fontWeight:"bold"
},

classNameBox: {
    position: 'absolute',
    width: Size(36),
    height: Size(20),
    marginTop: 15,
    alignSelf: 'baseline',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#4595FF',
    justifyContent: 'center',
    alignItems: 'center',
},

```

