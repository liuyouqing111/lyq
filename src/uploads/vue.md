1.异步组件相关

对于一些v-if的才要显示的组件，使用defineAsynccomponent包裹，这样可以分包。

其中在defineAsynccomponent里面有许多的配置项，包括什么时候显示。

异步组件通常在suspence中使用，只能包裹一个，还有一个默认的fallback组件。

2.对于ts定义相关

对ref类型泛型定义。

对reactive不要使用泛型定义。

对于computed 使用泛型或者不指定，会默认推导。

对于ref引用类型 

ref(html|null)(null)

对于props 定义 使用 PropType<>

为provide inject 类型 InjectionKey<>

对于v-if频繁切换的组件，可以使用transtion包裹，增加动态效果

对于v-for的话，使用transtionGroup.

要插入到固定位置有<telpot>

虚拟dom带来的主要收益是能够让你声明式的创建组件，而不用去操作dom.

ref源码：

![](C:\Users\admin\AppData\Roaming\marktext\images\2023-04-07-14-05-34-image.png)

![](C:\Users\admin\AppData\Roaming\marktext\images\2023-04-07-14-09-31-image.png)

![](C:\Users\admin\AppData\Roaming\marktext\images\2023-04-07-14-08-54-image.png)

computed源码：

<img title="" src="file:///C:/Users/admin/AppData/Roaming/marktext/images/2023-04-07-13-59-15-image.png" alt="" width="832" data-align="inline">

![](C:\Users\admin\AppData\Roaming\marktext\images\2023-04-07-14-03-53-image.png)

reactive源码：

![](C:\Users\admin\AppData\Roaming\marktext\images\2023-04-07-14-11-54-image.png)

![](C:\Users\admin\AppData\Roaming\marktext\images\2023-04-07-14-14-02-image.png)

![](C:\Users\admin\AppData\Roaming\marktext\images\2023-04-07-14-25-24-image.png)

![](C:\Users\admin\AppData\Roaming\marktext\images\2023-04-07-14-24-41-image.png)

 watchEffect源码

![](C:\Users\admin\AppData\Roaming\marktext\images\2023-04-07-15-21-11-image.png)
```js
console.log(1)
```
