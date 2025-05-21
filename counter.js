window.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('[data-counterjs]');
    
    counters.forEach(counter => {
        const targetDateStr = counter.getAttribute('data-counterjs');
        const hideWhenZero = counter.getAttribute('data-counterjs-hidden') === 'true';
        const hideYear = counter.getAttribute('data-counterjs-hide-year') === 'true';
        const hideMonth = counter.getAttribute('data-counterjs-hide-month') === 'true';
        const hideDay = counter.getAttribute('data-counterjs-hide-day') === 'true';
        const hideHour = counter.getAttribute('data-counterjs-hide-hour') === 'true';
        const hideMinute = counter.getAttribute('data-counterjs-hide-minute') === 'true';
        const hideSecond = counter.getAttribute('data-counterjs-hide-second') === 'true';
        const dateSeparator = counter.getAttribute('data-counterjs-date-separator') || ' '; // Separador entre unidades de data
        const timeSeparator = counter.getAttribute('data-counterjs-time-separator') || ' '; // Separador entre unidades de tempo
        const dateTimeSeparator = counter.getAttribute('data-counterjs-datetime-separator') || ' '; // Separador entre data e hora
        const [dateStr, timeStr] = targetDateStr.split(' ');
        const [DD, MM, YY] = dateStr.split('/').map(Number);
        const [HH, MI, SS] = timeStr.split(':').map(Number);
        let interval;

        function updateCounter() {
            const current_time = new Date();
            const future_time = new Date(YY, MM - 1, DD, HH, MI, SS);
            const ss = Math.floor((future_time - current_time) / 1000);

            if (ss <= 0) {
                clearInterval(interval);
                if (hideWhenZero) {
                    counter.style.display = 'none';
                    return;
                }
                // Mostra zeros formatados respeitando as flags
                let zeroHtml = '<span class="counter-container">';
                let hasContent = false;
                
                // Adiciona unidades de data
                if (!hideYear) {
                    zeroHtml += `
                        <span class="counter-group">
                            <span class="counter-value">00</span>
                            <span class="counter-label">Anos</span>
                        </span>`;
                    hasContent = true;
                }
                
                if (!hideMonth) {
                    if (hasContent) {
                        zeroHtml += `<span class="counter-separator">${dateSeparator}</span>`;
                    }
                    zeroHtml += `
                        <span class="counter-group">
                            <span class="counter-value">00</span>
                            <span class="counter-label">Meses</span>
                        </span>`;
                    hasContent = true;
                }
                
                if (!hideDay) {
                    if (hasContent) {
                        zeroHtml += `<span class="counter-separator">${dateSeparator}</span>`;
                    }
                    zeroHtml += `
                        <span class="counter-group">
                            <span class="counter-value">00</span>
                            <span class="counter-label">Dias</span>
                        </span>`;
                    hasContent = true;
                }
                
                // Adiciona separador entre data e hora, se necessário
                if (hasContent && (!hideHour || !hideMinute || !hideSecond)) {
                    zeroHtml += `<span class="counter-separator">${dateTimeSeparator}</span>`;
                    hasContent = true;
                }
                
                // Adiciona unidades de tempo
                if (!hideHour) {
                    zeroHtml += `
                        <span class="counter-group">
                            <span class="counter-value">00</span>
                            <span class="counter-label">Horas</span>
                        </span>`;
                    hasContent = true;
                }
                
                if (!hideMinute) {
                    if (hasContent) {
                        zeroHtml += `<span class="counter-separator">${timeSeparator}</span>`;
                    }
                    zeroHtml += `
                        <span class="counter-group">
                            <span class="counter-value">00</span>
                            <span class="counter-label">Minutos</span>
                        </span>`;
                    hasContent = true;
                }
                
                if (!hideSecond) {
                    if (hasContent) {
                        zeroHtml += `<span class="counter-separator">${timeSeparator}</span>`;
                    }
                    zeroHtml += `
                        <span class="counter-group">
                            <span class="counter-value">00</span>
                            <span class="counter-label">Segundos</span>
                        </span>`;
                }
                
                zeroHtml += '</span>';
                counter.innerHTML = zeroHtml;
                return;
            }

            // Calcular os valores totais
            const totalSeconds = ss;
            const totalMinutes = Math.floor(totalSeconds / 60);
            const totalHours = Math.floor(totalMinutes / 60);
            const totalDays = Math.floor(totalHours / 24);
            const totalMonths = Math.floor(totalDays / 30);
            const totalYears = Math.floor(totalMonths / 12);

            // Calcular os valores restantes
            const remainingSS = totalSeconds % 60;
            const remainingMinutes = totalMinutes % 60;
            const remainingHours = totalHours % 24;
            const remainingDays = totalDays % 30;
            const remainingMonths = totalMonths % 12;

            // Criar o HTML dinâmico com base nos valores
            let counterHTML = '<span class="counter-container">';
            let hasContent = false;
            
            let hasTimeContent = false;
            
            function addSeparator() {
                if (hasContent) {
                    let sep = '';
                    if (hasTimeContent) {
                        sep = timeSeparator;
                    } else if (hideYear && hideMonth && hideDay) {
                        sep = timeSeparator;
                    } else if (hideHour && hideMinute && hideSecond) {
                        sep = dateSeparator;
                    } else if (hasTimeContent === false && (hideHour || hideMinute || hideSecond)) {
                        sep = dateTimeSeparator;
                    } else {
                        sep = hasTimeContent ? timeSeparator : dateSeparator;
                    }
                    
                    if (sep) {
                        counterHTML += `<span class="counter-separator">${sep}</span>`;
                    }
                }
            }
            
            if (!hideYear && totalYears > 0) {
                addSeparator();
                counterHTML += `
                    <span class="counter-group">
                        <span class="counter-value">${totalYears.toString().padStart(2, '0')}</span>
                        <span class="counter-label">${totalYears > 1 ? 'Anos' : 'Ano'}</span>
                    </span>`;
                hasContent = true;
            }

            if (!hideMonth && (remainingMonths > 0 || hasContent)) {
                addSeparator();
                counterHTML += `
                    <span class="counter-group">
                        <span class="counter-value">${remainingMonths.toString().padStart(2, '0')}</span>
                        <span class="counter-label">${remainingMonths > 1 ? 'Meses' : 'Mês'}</span>
                    </span>`;
                hasContent = true;
            }

            if (!hideDay && (remainingDays > 0 || hasContent)) {
                addSeparator();
                counterHTML += `
                    <span class="counter-group">
                        <span class="counter-value">${remainingDays.toString().padStart(2, '0')}</span>
                        <span class="counter-label">${remainingDays > 1 ? 'Dias' : 'Dia'}</span>
                    </span>`;
                hasContent = true;
            }

            if (!hideHour) {
                hasTimeContent = true;
                addSeparator();
                counterHTML += `
                    <span class="counter-group">
                        <span class="counter-value">${remainingHours.toString().padStart(2, '0')}</span>
                        <span class="counter-label">${remainingHours > 1 ? 'Horas' : 'Hora'}</span>
                    </span>`;
                hasContent = true;
            }

            if (!hideMinute && (remainingMinutes > 0 || hasContent)) {
                hasTimeContent = true;
                addSeparator();
                counterHTML += `
                    <span class="counter-group">
                        <span class="counter-value">${remainingMinutes.toString().padStart(2, '0')}</span>
                        <span class="counter-label">${remainingMinutes > 1 ? 'Minutos' : 'Minuto'}</span>
                    </span>`;
                hasContent = true;
            }

            if (!hideSecond) {
                hasTimeContent = true;
                addSeparator();
                counterHTML += `
                    <span class="counter-group">
                        <span class="counter-value">${remainingSS.toString().padStart(2, '0')}</span>
                        <span class="counter-label">${remainingSS > 1 ? 'Segundos' : 'Segundo'}</span>
                    </span>`;
            }

            counterHTML += '</span>';
            counter.innerHTML = counterHTML;
        }

        updateCounter();
        interval = setInterval(updateCounter, 1000);
    });
});