
function calculate() {
	//найти элементы ввода и вывода в документе
	var amount = document.getElementById("amount");
	var apr = document.getElementById("apr");
	var years = document.getElementById("years");
	var payment = document.getElementById("payment");
	var totalinterest = document.getElementById("totalinterest");
	/*получить введенные пользов-лем данные
	преобразовать процентную ставку из процентов в десятичное число и преобр
	годовую ставку в мес ставку
	преобразовать период платежей в годах в кол-во мес платежей
	*/ 
	var principal = parseFloat(amount.value);
	var interest = parseFloat(apr.value)/100/12;
	var payments = parseFloat(years.value) * 12;

	//Вычислить сумму ежемесячного платежа

	var x = Math.pow(1 + interest, payments); 
	var monthly = (principal*x*interest)/(x-1);

	/*если результатом явл конечное число, то пользователь указал
	корректные данные,отобразить рез-ты
	*/

	if (isFinite(monthly)) {
		//заполнить поля вывода, округлив рез-ты до 2 дес знаков
		payment.innerHTML = monthly.toFixed(2);
		totalinterest.innerHTML = ((monthly*payments)-principal).toFixed(2);

	//Сохранить ввод польз-ля//

		save(amount.value, apr.value, years.value);
	}

	else {
		//данные получены некорректно 
		payment.innerHTML = ""; //стереть содержимое этих элементов
		totalinterest.innerHTML = "";
	}
}
//сохранить ввод поль-ля в св-вах объекта localStorage

function save(amount,apr, years) {
	if (window.localStorage) { //выполнить сохранение если поддерж-ся
		localStorage.loan_amount = amount;
		localStorage.loan_apr = apr;
		localStorage.loan_years = years;
	}
}
//автоматически восстановить поля ввода при загрузке документа
window.onload = function() {
	//если браузер поддерживает localStorage и имеются сохраненные данные
	if (window.localStorage && localStorage.loan_amount) {
		document.getElementById("amount").value = localStorage.loan_amount; //сумма кред
		document.getElementById("apr").value = localStorage.loan_apr; //проц ставка
		document.getElementById("years").value = localStorage.loan_years; //срок кредита

	}
};
//передать ввод пользователя серверному сцен кот может возвращать
//список ссылок




