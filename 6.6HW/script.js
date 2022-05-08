
/////////////////////////////////////////////////////////////////////////////////////////////
//6.6 HOMEWORK
/////////////////////////////////////////////////////////////////////////////////////////////
// Реализован чат на основе эхо-сервера 'wss://echo-ws-service.herokuapp.com'
// Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».
// При клике на кнопку «Отправить» сообщение появляется в окне переписки.
// Эхо-сервер будет отвечать вам тем же сообщением, оно также выводится в чат:
// Добавлен в чат механизм отправки геолокации: 
// При клике на кнопку «Геолокация» отправляется данные серверу и в чат выводится ссылка на
// 'https://www.openstreetmap.org/' с вашей геолокацией. Сообщение, которое отправит обратно эхо-сервер,
//  выводятcя в теге <title>
/////////////////////////////////////////////////////////////////////////////////////////////
let reqStatus = true;
const mapLink = document.querySelector('#map-link');
const input_btn = document.querySelector('.input_btn');
const geo_btn = document.querySelector('.getGeolocation');
const message = document.querySelector('.chat-field');
let message_id = 1;
// Функция, выводящая текст об ошибке
const error = () => {
  message.firstChild.lastChild.innerText = 'Невозможно получить ваше местоположение';
  reqStatus = true;
}

function ActDate (){
const actDate = new Date();
const act_date = `${actDate.getDate()} ${actDate.getMonth()} ${actDate.getFullYear()} ${actDate.getHours()}:${actDate.getMinutes()} `
  return act_date
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => { //
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  message.firstChild.lastChild.innerText = '';
  message.firstChild.lastChild.insertAdjacentHTML('afterbegin', `<a id = "map-link" target="_blank" title="Широта: ${latitude} °, Долгота: ${longitude} ° " href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}">Гео-локация</a>`);
  reqStatus = true;
}
function createMessage(text, author) {
    if (author != 'EchoBot'){
      let sms = `<div class="client_message" id="${message_id}"><p id='Author'>${author}  ${ActDate()}</p><p id = "status">${text}</p></div>`;
      message.insertAdjacentHTML('afterbegin',  sms);
    }else{
      let sms = `<div class="server_message" id="${message_id}"><p id="Author">EchoBot  ${ActDate()}</p><p id = "status">${text}<a id = "map-link" target="_blank" href=""></a></p></div>`;
      message.insertAdjacentHTML('afterbegin', sms);
    }
  message_id += 1;
}
geo_btn.addEventListener('click', () => {
  reqStatus = false;
  createMessage('Определение местоположения…', 'EchoBot');
  if (!navigator.geolocation) { //проверка наличия обьекта geolocation в навигаторе(поддержка браузером)
    message.firstChild.lastChild.innerText = 'Geolocation не поддерживается вашим браузером'; // выводим в блок status тескт
  } else {
    navigator.geolocation.getCurrentPosition(success, error);// Обращаемся к навигации с помощью метода
                                                             //getCurrentPosition у обьекта geolocation
  }
});


input_btn.addEventListener('click', (e) => {
  if (reqStatus) {
    const chat_input = document.querySelector('.chat_input').value;
    document.querySelector('.chat_input').value = '';
    if (!chat_input) { //проверка наличия обьекта geolocation в навигаторе(поддержка браузером)
      message.firstChild.lastChild.innerText = 'Пустое сообщение'; // выводим в блок status тескт
    } else{
      createMessage(chat_input,'Anonymus');
      EchoBot(chat_input);
    }
  }
});
