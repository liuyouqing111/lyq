const React = require('react');
const axios = require('axios');
const routes = [{
  name: '用户模块',
  children: [{
    name: '/user/login',
    methods: 'post',
    type: 'body',
    value: {
      username: 'string',
      password: 'string'
    }
  }]
}
// {
// 	name: '动态模块',
// 	children: [{
//     name:'/trend',
//     methods:'post',
//     id:2
//   }],
// },
];

function Demo() {
  const [currentIndex, setIndex] = React.useState(-1);
  const [currentModule, setCurrentModule] = React.useState(-1);
  const [value, setvalue] = React.useState('');
  const [res, setRes] = React.useState('');
  // const add=()=>{
  //   setIndex(index+1)
  // }
  const changeModule = index => {
    if (currentModule === index) {
      setCurrentModule(-1);
    } else {
      setCurrentModule(index);
      setIndex(-1);
    }
  };
  const changIndex = index => {
    if (currentIndex === index) {
      setIndex(-1);
    } else {
      setIndex(index);
    }
  };
  React.useEffect(() => {
    if (currentIndex !== -1 && currentModule !== -1) {
      setvalue(routes[currentModule].children[currentIndex].value);
    }
  }, [currentIndex, currentModule]);
  const send = async (url, method) => {
    console.log(url);
    const res = await axios.default[method](url, value);
    setRes(res?.data);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "title"
  }), routes.map((item, index) => {
    return /*#__PURE__*/React.createElement("ul", {
      className: "api",
      key: item.name
    }, /*#__PURE__*/React.createElement("div", {
      className: "api-title",
      onClick: () => {
        changeModule(index);
      }
    }, item.name), currentModule === index ? /*#__PURE__*/React.createElement(React.Fragment, null, item.children.map((citem, cindex) => {
      return /*#__PURE__*/React.createElement("li", {
        className: "api-item",
        key: citem.name
      }, /*#__PURE__*/React.createElement("div", {
        className: "item-content"
      }, /*#__PURE__*/React.createElement("div", {
        className: "item-title",
        onClick: () => {
          changIndex(cindex);
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "item-method"
      }, citem.methods), /*#__PURE__*/React.createElement("div", {
        className: "item-path"
      }, citem.name)), currentIndex === cindex ? /*#__PURE__*/React.createElement("div", {
        className: "item-info"
      }, /*#__PURE__*/React.createElement("div", {
        className: "request"
      }, /*#__PURE__*/React.createElement("div", {
        className: "params"
      }, /*#__PURE__*/React.createElement("div", {
        className: "left"
      }, citem.type, /*#__PURE__*/React.createElement("div", {
        className: "btn",
        onClick: () => {
          send(citem.name, citem.methods);
        }
      }, "\u53D1\u9001")), citem.type === 'body' ? /*#__PURE__*/React.createElement("input", {
        type: "textarea",
        className: "right",
        value: JSON.stringify(value),
        onChange: e => {
          try {
            setvalue(JSON.parse(e.target.value));
          } catch (error) {
            console.log(error);
          }
        }
      }) : null)), /*#__PURE__*/React.createElement("div", {
        className: "response"
      }, JSON.stringify(res))) : null));
    })) : null);
  }));
}
function App() {
  const click = () => {
    console.log(123);
  };
  return /*#__PURE__*/React.createElement("html", null, /*#__PURE__*/React.createElement("head", null, /*#__PURE__*/React.createElement("meta", {
    charSet: "utf-8"
  }), /*#__PURE__*/React.createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1"
  }), /*#__PURE__*/React.createElement("link", {
    rel: "stylesheet",
    href: "/styles.css"
  }), /*#__PURE__*/React.createElement("title", null, "My app")), /*#__PURE__*/React.createElement("body", null, /*#__PURE__*/React.createElement(Demo, null)));
}
module.exports = App;