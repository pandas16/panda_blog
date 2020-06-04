---
title: 'react native关于style类型的属性(PropTypes)确认'
date: 2019-10-24 11:58:15
author: '非動ご'
featuredpost: false
featuredimage: ../../images/first-blog-img.png
tags:
 - react
---

先做一下错误(❎)示范：

```javascript
import PropTypes from 'prop-types';

static propTypes = {
    containerStyle: PropTypes.style,
}
```

结果：

` Warning: Failed prop type: LocationIndex: prop type containerStyle is invalid; it must be a function, usually from the prop-types package, but received  undefined .`

大致意思是说： `prop-types` 中根本没有定义`style` 类型。

但是实际开发中确实需要验证`style`类型有怎么办呢？

方法一：

```javascript
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

static propTypes = {
    containerStyle: ViewPropTypes.style,
}
```

方法二：

```javascript
import PropTypes from 'prop-types';

static propTypes = {
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}
```

