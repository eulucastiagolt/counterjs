class CounterJS {
    constructor(selector) {
        this.selector = selector || null;
        this.counters = [];
    }

    init() {
        const elements = this.selector 
            ? document.querySelectorAll(this.selector)
            : document.querySelectorAll('[data-counterjs]');
        
        elements.forEach(element => this.setupCounter(element));
        return this;
    }

    setupCounter(counter) {
        const targetDateStr = counter.getAttribute('data-counterjs-date');
        if (!targetDateStr) {
            console.warn('Atributo data-counterjs-date não encontrado no elemento:', counter);
            return;
        }

        const counterData = {
            element: counter,
            hideWhenZero: counter.getAttribute('data-counterjs-hidden') === 'true',
            hideYear: counter.getAttribute('data-counterjs-hide-year') === 'true',
            hideMonth: counter.getAttribute('data-counterjs-hide-month') === 'true',
            hideDay: counter.getAttribute('data-counterjs-hide-day') === 'true',
            hideHour: counter.getAttribute('data-counterjs-hide-hour') === 'true',
            hideMinute: counter.getAttribute('data-counterjs-hide-minute') === 'true',
            hideSecond: counter.getAttribute('data-counterjs-hide-second') === 'true',
            dateSeparator: counter.getAttribute('data-counterjs-date-separator') || ' ',
            timeSeparator: counter.getAttribute('data-counterjs-time-separator') || ':',
            dateTimeSeparator: counter.getAttribute('data-counterjs-datetime-separator') || ' ',
            interval: null
        };

        this.counters.push(counterData);
        this.startCounter(counterData);
    }

    startCounter(counterData) {
        const { element: counter } = counterData;
        const targetDateStr = counter.getAttribute('data-counterjs-date');
        
        let DD, MM, YY, HH = 0, MI = 0, SS = 0;

        try {
            // Separa data e hora
            const [dateStr, timeStr] = targetDateStr.split(' ');
            
            // Processa a data (formato DD/MM/YYYY)
            const [day, month, year] = dateStr.split('/').map(Number);
            
            // Cria o objeto Date
            const date = new Date(year, month - 1, day);
            
            if (isNaN(date.getTime())) {
                throw new Error('Data inválida');
            }
            
            // Define dia, mês e ano
            DD = date.getDate();
            MM = date.getMonth() + 1;
            YY = date.getFullYear();
            
            // Processa a hora se existir
            if (timeStr) {
                [HH, MI, SS] = timeStr.split(':').map(Number);
            }
            
            // Garante que o ano tem 4 dígitos (para datas com 2 dígitos)
            if (YY < 100) YY += 2000;
            
        } catch (error) {
            console.error('Erro ao processar data/hora:', error);
            counter.textContent = 'Erro na data';
            return;
        }

        const updateCounter = () => {
            const current_time = new Date();
            const future_time = new Date(YY, MM - 1, DD, HH, MI, SS);
            const ss = Math.floor((future_time - current_time) / 1000);

            if (ss <= 0) {
                clearInterval(counterData.interval);
                if (counterData.hideWhenZero) {
                    counter.style.display = 'none';
                    return;
                }

                // Lógica para quando o contador termina
                let zeroHTML = '<span class="counter-container">';
                let hasContent = false;

                // Adiciona as unidades de data
                if (!counterData.hideYear) {
                    zeroHTML += `
                        <span class="counter-group">
                            <span class="counter-value">00</span>
                            <span class="counter-label">Anos</span>
                        </span>`;
                    hasContent = true;
                }
                
                if (!counterData.hideMonth) {
                    if (hasContent) zeroHTML += `<span class="counter-separator">${counterData.dateSeparator}</span>`;
                    zeroHTML += `
                        <span class="counter-group">
                            <span class="counter-value">00</span>
                            <span class="counter-label">Meses</span>
                        </span>`;
                    hasContent = true;
                }
                
                if (!counterData.hideDay) {
                    if (hasContent) zeroHTML += `<span class="counter-separator">${counterData.dateSeparator}</span>`;
                    zeroHTML += `
                        <span class="counter-group">
                            <span class="counter-value">00</span>
                            <span class="counter-label">Dias</span>
                        </span>`;
                    hasContent = true;
                }


                // Adiciona separador entre data e hora se necessário
                if (hasContent && (!counterData.hideHour || !counterData.hideMinute || !counterData.hideSecond)) {
                    zeroHTML += `<span class="counter-separator">${counterData.dateTimeSeparator}</span>`;
                }


                // Adiciona as unidades de tempo
                if (!counterData.hideHour) {
                    zeroHTML += `
                        <span class="counter-group">
                            <span class="counter-value">00</span>
                            <span class="counter-label">Horas</span>
                        </span>`;
                    hasContent = true;
                }
                
                if (!counterData.hideMinute) {
                    if (hasContent) zeroHTML += `<span class="counter-separator">${counterData.timeSeparator}</span>`;
                    zeroHTML += `
                        <span class="counter-group">
                            <span class="counter-value">00</span>
                            <span class="counter-label">Minutos</span>
                        </span>`;
                    hasContent = true;
                }
                
                if (!counterData.hideSecond) {
                    if (hasContent) zeroHTML += `<span class="counter-separator">${counterData.timeSeparator}</span>`;
                    zeroHTML += `
                        <span class="counter-group">
                            <span class="counter-value">00</span>
                            <span class="counter-label">Segundos</span>
                        </span>`;
                }
                
                zeroHTML += '</span>';
                counter.innerHTML = zeroHTML;
                return;
            }


            // Cálculo dos valores totais
            const totalSegundos = ss;
            const totalMinutos = Math.floor(totalSegundos / 60);
            const totalHoras = Math.floor(totalMinutos / 60);
            const totalDias = Math.floor(totalHoras / 24);
            const totalMeses = Math.floor(totalDias / 30);
            const totalAnos = Math.floor(totalMeses / 12);

            // Cálculo dos valores restantes
            const segundosRestantes = totalSegundos % 60;
            const minutosRestantes = totalMinutos % 60;
            const horasRestantes = totalHoras % 24;
            const diasRestantes = totalDias % 30;
            const mesesRestantes = totalMeses % 12;

            // Cria o HTML do contador
            let counterHTML = '<span class="counter-container">';
            let hasContent = false;

            // Função auxiliar para adicionar separadores
            const addSeparator = (context = 'date') => {
                if (!hasContent) return;
                
                if (context === 'date') {
                    counterHTML += `<span class="counter-separator">${counterData.dateSeparator}</span>`;
                } 
                else if (context === 'time') {
                    counterHTML += `<span class="counter-separator">${counterData.timeSeparator}</span>`;
                }
                else if (context === 'datetime') {
                    counterHTML += `<span class="counter-separator">${counterData.dateTimeSeparator}</span>`;
                }
            };

            // Adiciona as unidades de data
            if (!counterData.hideYear && totalAnos > 0) {
                counterHTML += `
                    <span class="counter-group">
                        <span class="counter-value">${totalAnos.toString().padStart(2, '0')}</span>
                        <span class="counter-label">${totalAnos === 1 ? 'Ano' : 'Anos'}</span>
                    </span>`;
                hasContent = true;
            }

            if (!counterData.hideMonth && (mesesRestantes > 0 || hasContent)) {
                if (hasContent) addSeparator('date');
                counterHTML += `
                    <span class="counter-group">
                        <span class="counter-value">${mesesRestantes.toString().padStart(2, '0')}</span>
                        <span class="counter-label">${mesesRestantes === 1 ? 'Mês' : 'Meses'}</span>
                    </span>`;
                hasContent = true;
            }

            if (!counterData.hideDay && (diasRestantes > 0 || hasContent)) {
                if (hasContent) addSeparator('date');
                counterHTML += `
                    <span class="counter-group">
                        <span class="counter-value">${diasRestantes.toString().padStart(2, '0')}</span>
                        <span class="counter-label">${diasRestantes === 1 ? 'Dia' : 'Dias'}</span>
                    </span>`;
                hasContent = true;
            }

            // Não precisamos mais adicionar o dateTimeSeparator aqui, pois ele é tratado na função addSeparator


            // Adiciona separador entre data e hora se houver itens de data e tempo
            if (hasContent && (!counterData.hideHour || !counterData.hideMinute || !counterData.hideSecond)) {
                addSeparator('datetime');
            }

            // Adiciona as unidades de tempo
            if (!counterData.hideHour) {
                counterHTML += `
                    <span class="counter-group">
                        <span class="counter-value">${horasRestantes.toString().padStart(2, '0')}</span>
                        <span class="counter-label">${horasRestantes === 1 ? 'Hora' : 'Horas'}</span>
                    </span>`;
                hasContent = true;
            }

            if (!counterData.hideMinute) {
                if (hasContent) addSeparator('time');
                counterHTML += `
                    <span class="counter-group">
                        <span class="counter-value">${minutosRestantes.toString().padStart(2, '0')}</span>
                        <span class="counter-label">Min</span>
                    </span>`;
                hasContent = true;
            }

            if (!counterData.hideSecond) {
                if (hasContent) addSeparator('time');
                counterHTML += `
                    <span class="counter-group">
                        <span class="counter-value">${segundosRestantes.toString().padStart(2, '0')}</span>
                        <span class="counter-label">Seg</span>
                    </span>`;
            }


            counterHTML += '</span>';
            counter.innerHTML = counterHTML;
        };
        
        // Inicia o contador
        updateCounter();
        counterData.interval = setInterval(updateCounter, 1000);
    }


    destroy() {
        this.counters.forEach(counter => {
            if (counter.interval) {
                clearInterval(counter.interval);
            }
        });
        this.counters = [];
    }
}

// Exporta para navegadores e módulos
if (typeof window !== 'undefined') window.CounterJS = CounterJS;
if (typeof module !== 'undefined' && module.exports) module.exports = CounterJS;
