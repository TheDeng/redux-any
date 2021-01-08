# redux-any
## 一个redux中间件
#### a middleware for processing action like function,promise,and array or nested array
#### 用来处理格式各样的action，包括函数类型，promise类型，数组类型或者嵌套数组类型。
#### Our middleware is based on redux-promise and redux-thunk .Our middlewrae enhances and combines these two middlewares so that it can processes many kinds of actions like function,promise,and array,in addition,we finish the nested array iteration
#### 我们的中间件是在redux-promise 和 redux-thunk这两个中间件的基础上进行开发，本中间件是对以上两个中间件的合并和增强，具体来说，只需要引入本中间件，就可以dispatch各种形式的action，包括函数形式、promise对象、对象中的payload是promise对象，以及由上面**三种action组成的数组，以及嵌套数组**。 也就是说，本中间件可以方便我们处理以各种形式呈现的action对象。
# Usage:

- > npm i redux-any --save
- > import anyMiddleWare from 'redux-any'
- > const store = createStore(reducer, applyMiddleware(anyMiddleWare))


