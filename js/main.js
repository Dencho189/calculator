(function () {

    var plus = document.getElementById('plus');
    var equal = document.getElementById('equal');
    var screen = document.getElementById('screen');
    var preration_screen = document.getElementById('operation');
    var k, temp, operation, action_memory, number1, number2, memory_save = false, bool_operation = false, action_operation = '';

    equal.style.height = (plus.offsetHeight * 2) + 4 + 'px';
    plus.style.marginTop = '-' + (plus.clientHeight + 4) + 'px';
    equal.style.lineHeight = '4em';

    var li = document.getElementsByClassName('digit');
    for (k=0; k<li.length;k++){
        li[k].addEventListener('click',function () {
            if(!bool_operation){
                if (this.innerHTML == '0'){
                    if (screen.value != '0') screen.value = screen.value + this.innerHTML;
                }else if(screen.value == '0'){
                    screen.value = this.innerHTML;
                }else{
                    screen.value = screen.value + this.innerHTML;
                }
            }else{
                if(action_operation === 'sqrt'){
                    preration_screen.innerHTML = '';
                    screen.value = '';
                    screen.value =  this.innerHTML;
                }else{
                    screen.value = '';
                    screen.value =  this.innerHTML;
                    bool_operation = false;
                }
            }
        });
    }

    document.getElementById('backspace').addEventListener('click',function () {
        if(screen.value != '' && screen.value != '0'){
            screen.value = screen.value.substr(0, screen.value.length - 1)
        }
    });

    document.getElementById('clear_ce').addEventListener('click',function () {
        if(number1 != '0'){
            screen.value = '0';
        }
    });

    document.getElementById('clear_c').addEventListener('click',function () {
        number1 = 0;
        number2 = 0;
        localStorage.clear();
        screen.value = '';
        preration_screen.innerText = '';
    });

    document.getElementById('point').addEventListener('click',function () {
        if (screen.value.search(/\./) == -1){
            screen.value = screen.value + '.';
        }
    });

    //М+ – добавляет в память отображаемое число, если в памяти уже есть число, то эти числа суммируются, при этом результат суммы не отображается.
    //MR – отображает число, находящееся в памяти
    //М- – добавляет в память отображаемое число, переводя его в отрицательное. Если в памяти уже есть число, то производится вычитание, при этом результат не отображается
    //MC – Очищает память
    //MS (Memory Save) - кнопка означает сохранить число, отображенное в данный момент на дисплее калькулятора в память.
    var o_memory = {
        ms: function (){
            if( screen.value != '0' || screen.value != null){
                localStorage['memory'] = screen.value;
                memory_save = true;
                document.getElementById('mem').style.display = 'block';
            }
        },
        mc: function(){
            localStorage.clear();
            document.getElementById('mem').style.display = 'none';
        },
        mr: function () {
            try {
                screen.value = localStorage['memory'];

            }catch (e){
                screen.value = 'В памяти нет числа';
            }
        },
        m_plus: function () {
            if( screen.value != '0' || screen.value != null){
                var m = ( localStorage['memory'] === undefined ) ? '' : localStorage['memory'];
                var result = (+m)+ (+screen.value);
                localStorage['memory'] = result ;
                screen.value = result;
            }
        },
        m_minus: function () {
            if( screen.value != '0' || screen.value != null){
                localStorage['memory'] = screen.value * -1;
            }
        }
    };

    var memory = document.getElementsByClassName('memory');
    for (k=0; k<memory.length;k++){
        if( memory[k].innerHTML.search(/\+/) > 0 ){
            action_memory = 'm_plus';
        }else if(memory[k].innerHTML.search(/-/) > 0){
            action_memory = 'm_minus';
        }else{
            action_memory = memory[k].innerHTML;
        }
        memory[k].addEventListener('click', o_memory[action_memory]);
    }

    var arifmetic_operation = {
        plus: function () {
            if(preration_screen.innerHTML == '' || preration_screen.innerHTML == null){
                preration_screen.innerHTML = screen.value + ' + ';
            }else{
                preration_screen.innerHTML = screen.value + ' + ';
            }
            bool_operation = true;
            number1 = screen.value;
            action_operation = 'plus';
        },
        minus: function () {
            if(preration_screen.innerHTML == '' || preration_screen.innerHTML == null){
                preration_screen.innerHTML = screen.value + ' - ';
            }else{
                preration_screen.innerHTML = screen.value + ' - ';
            }
            bool_operation = true;
            number1 = screen.value;
            action_operation = 'minus';
        },
        //умножить
        multiply: function () {
            if(preration_screen.innerHTML == '' || preration_screen.innerHTML == null){
                preration_screen.innerHTML = screen.value + ' * ';
            }else{
                preration_screen.innerHTML = screen.value + ' * ';
            }
            bool_operation = true;
            number1 = screen.value;
            action_operation = 'multiply';
        },
        //разделить
        divide: function () {
            if(preration_screen.innerHTML == '' || preration_screen.innerHTML == null){
                preration_screen.innerHTML = screen.value + ' / ';
            }else{
                preration_screen.innerHTML = screen.value + ' / ';
            }
            bool_operation = true;
            number1 = screen.value;
            action_operation = 'divide';
        },
        percent: function () {
            screen.value = (+(number1)/100) * +(screen.value);
        },
        change: function () {
            number1 = +screen.value;
            if (screen.value > 0){
                screen.value = screen.value * -1;
            }else{
                screen.value = Math.abs(screen.value);
            }

        },
        sqrt: function () {
            if ( screen.value != '' && screen.value != '0'){
                preration_screen.innerText = 'sqrt('+screen.value+')';
                screen.value = Math.sqrt(screen.value);
                action_operation = 'sqrt';
                bool_operation = true;
            }
        },
        equals: function () {
            preration_screen.innerHTML  = preration_screen.innerHTML + screen.value;
            switch (action_operation){
                case 'plus':
                    temp = +(screen.value);
                    screen.value = +(number1) + +(screen.value);
                    number1 = temp;
                    preration_screen.innerHTML = '';
                    break;
                case 'minus':
                    temp = +(screen.value);
                    screen.value = +(number1) - +(screen.value);
                    number1 = temp;
                    preration_screen.innerHTML = '';
                    break;
                case 'multiply':
                    temp = +(screen.value);
                    screen.value = +(number1) * +(screen.value);
                    number1 = temp;
                    preration_screen.innerHTML = '';
                    break;
                case 'divide':
                    temp = +(screen.value);
                    screen.value = +(number1) / +(screen.value);
                    number1 = temp;
                    preration_screen.innerHTML = '';
                    break;
            }
        },
        one_d_x: function () {
            if ( screen.value != '' && screen.value != '0'){
                preration_screen.innerText = 'reciproc('+screen.value+')';
                screen.value = 1 / (+screen.value);

            }
        }
    };

    document.getElementById('change').addEventListener('click', arifmetic_operation.change );
    document.getElementById('equal').addEventListener('click', arifmetic_operation.equals );

    operation = document.getElementsByClassName('arithmetic_operation');
    for (k=0; k < operation.length;k++){
        if(typeof(operation[k].innerHTML) == 'string'){
            switch (operation[k].innerHTML){
                case 'sqrt':
                    operation[k].addEventListener('click', arifmetic_operation.sqrt);
                    break;
                case '/':
                    operation[k].addEventListener('click', arifmetic_operation.divide);
                    break;
                case '%':
                    operation[k].addEventListener('click', arifmetic_operation.percent);
                    break;
                case '*':
                    operation[k].addEventListener('click', arifmetic_operation.multiply);
                    break;
                case '1/x':
                    operation[k].addEventListener('click', arifmetic_operation.one_d_x);
                    break;
                case '-':
                    operation[k].addEventListener('click', arifmetic_operation.minus);
                    break;
                case '+':
                    operation[k].addEventListener('click', arifmetic_operation.plus);
                    break;
            }
        }
    }



})();