import _ from 'lodash';
import printMe from './print.js';
// import './styles.css';


if (process.env.NODE_ENV !== 'production') {
   console.log('Looks like we are in development mode!');
 }


function component() {

  var element = document.createElement('div');

    // lodash 是由当前 script 脚本 import 导入进来的
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.onclick = printMe.bind(null, 'Hello webpack!');

    return element;

}

   document.body.appendChild(component());

if (module.hot) {
   module.hot.accept('./print.js', function() {
     console.log('Accepting the updated printMe module!');
     printMe();
   })
 }
