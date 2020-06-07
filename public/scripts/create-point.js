populateUFs();
setSubmitState();

document.getElementById('state').addEventListener("change", setCities);
document.getElementById('city').addEventListener("change", setHiddenInputs);

document.querySelector('input[name=name]').addEventListener("keyup", setSubmitState);
document.querySelector('input[name=image]').addEventListener("keyup", setSubmitState);
document.querySelector('input[name=address]').addEventListener("keyup", setSubmitState);
document.querySelector('input[name=address2]').addEventListener("keyup", setSubmitState);

//Preenche a lista de Estados
function populateUFs() {
	const stateSelect = document.getElementById('state');

	const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

	fetch( url, { method: 'GET' })
	.then( res => res.json() )
	.then( jsonStates => {
		
		for ( state of jsonStates ) {
			stateSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
		}

	} )
	.catch( error => console.log('error:', error) );
}
//Preenche a lista de Cidades
function setCities(event) {
	setSubmitState();
	const citySelect = document.getElementById('city');

	citySelect.disabled = true;
	citySelect.innerHTML = '<option value="">Carregando Cidades</option>';

	const ufID = event.target.value;

	const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufID}/municipios`;


	fetch( url, { method: 'GET' })
	.then( res => res.json() )
	.then( jsonCities => {

		citySelect.options[0].text = 'Selecione a Cidade';

		for ( cities of jsonCities ) {
			citySelect.innerHTML += `<option value="${cities.id}">${cities.nome}</option>`;
		}

		citySelect.disabled = ufID !== ''? false: true;

	} )
	.catch( error => console.log('error:', error) );
}
//Preenche os inputs com os nomes do Estado e Cidade
function setHiddenInputs(){
	const stateSelect = document.getElementById('state');
	const stateInput = document.querySelector("input[name=state]");

	const citySelect = document.getElementById('city');
	const cityInput = document.querySelector("input[name=city]");

	stateInput.value = stateSelect.options[stateSelect.selectedIndex].text;
	cityInput.value = citySelect.options[citySelect.selectedIndex].text;

	setSubmitState();
}
//Verifica se os campos já estão todos preenchidos, e podem ser enviados
function setSubmitState(){
	const stateSelect = document.getElementById('state');
	const citySelect = document.getElementById('city');
	const nameInput = document.querySelector('input[name=name]');
	const urlImageInput = document.querySelector('input[name=image]');
	const addresssInput = document.querySelector('input[name=address]');
	const addresss2Input = document.querySelector('input[name=address2]');
	const inputItems = document.querySelector('input[name=items]');

	if(stateSelect.options[stateSelect.selectedIndex].text !== 'Selecione o Estado' &&
		citySelect.options[citySelect.selectedIndex].text !== 'Selecione a Cidade' &&
		nameInput.value !== '' &&
		addresssInput.value !== '' &&
		addresss2Input.value !== '' &&
		inputItems.value !== '' &&
		urlImageInput.value !== ''
	){
		document.querySelector('button[name=submit]').disabled = false;
		document.querySelector('button[name=submit]').style.opacity = 1;
	}else{
		document.querySelector('button[name=submit]').disabled = true;
		document.querySelector('button[name=submit]').style.opacity = 0.3;
	}
}

//Items de coleta
const itemsToCollect = document.querySelectorAll('.items-grid li');
var selectedItems = [];
const inputItems = document.querySelector('input[name=items]');

for (item of itemsToCollect) {
	item.addEventListener('click', handleSlectedItem);
}

//Seleciona ou remove a seleção de um item
function handleSlectedItem(e){
	const item = e.target;
	const itemId = e.target.dataset.id;
	
	item.classList.toggle('selected');

	selectedItems.includes(itemId)? removeItem(itemId): selectedItems.push(itemId);
	selectedItems.sort((a, b) => a - b);

	inputItems.value = selectedItems;

	setSubmitState();

	//remove um item específico
	function removeItem(id){
		const index = selectedItems.indexOf(id);
		index > -1? selectedItems.splice(index, 1): false;
	}
}