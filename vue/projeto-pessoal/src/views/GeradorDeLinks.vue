<script setup>
import { ref, watch, onMounted } from 'vue';

const selectedCode = ref(null);
const copySuccess = ref(false);

const countryCodes = ref([
        { country: "Afghanistão", iso: "AF / AFG", ddi: 93 },
        { country: "África do Sul", iso: "ZA / ZAF", ddi: 27 },
        { country: "Albânia", iso: "AL / ALB", ddi: 355 },
        { country: "Alemanha", iso: "DE / DEU", ddi: 49 },
        { country: "Andora", iso: "AD / AND", ddi: 376 },
        { country: "Angola", iso: "AO / AGO", ddi: 244 },
        { country: "Anguilla", iso: "AI / AIA", ddi: 1264 },
        { country: "Antarctica", iso: "AQ / ATA", ddi: 672 },
        { country: "Antígua e Barbuda", iso: "AG / ATG", ddi: 1268 },
        { country: "Argentina", iso: "AR / ARG", ddi: 54 },
        { country: "Argélia", iso: "DZ / DZA", ddi: 213 },
        { country: "Arménia", iso: "AM / ARM", ddi: 374 },
        { country: "Aruba", iso: "AW / ABW", ddi: 297 },
        { country: "Arábia Saudita", iso: "SA / SAU", ddi: 966 },
        { country: "Austrália", iso: "AU / AUS", ddi: 61 },
        { country: "Áustria", iso: "AT / AUT", ddi: 43 },
        { country: "Azerbaijão", iso: "AZ / AZE", ddi: 994 },
        { country: "Bahamas", iso: "BS / BHS", ddi: 1242 },
        { country: "Bahrein", iso: "BH / BHR", ddi: 973 },
        { country: "Bangladesh", iso: "BD / BGD", ddi: 880 },
        { country: "Barbados", iso: "BB / BRB", ddi: 1246 },
        { country: "Bélgica", iso: "BE / BEL", ddi: 32 },
        { country: "Belize", iso: "BZ / BLZ", ddi: 501 },
        { country: "Benim", iso: "BJ / BEN", ddi: 229 },
        { country: "Bermuda", iso: "BM / BMU", ddi: 1441 },
        { country: "Butão", iso: "BT / BTN", ddi: 975 },
        { country: "Bielorrússia", iso: "BY / BLR", ddi: 375 },
        { country: "Bolívia", iso: "BO / BOL", ddi: 591 },
        { country: "Bósnia e Herzegovina", iso: "BA / BIH", ddi: 387 },
        { country: "Botswana", iso: "BW / BWA", ddi: 267 },
        { country: "Brasil", iso: "BR / BRA", ddi: 55 },
        { country: "Brunei", iso: "BN / BRN", ddi: 673 },
        { country: "Bulgária", iso: "BG / BGR", ddi: 359 },
        { country: "Burkina Faso", iso: "BF / BFA", ddi: 226 },
        { country: "Myanmar (Burma)", iso: "MM / MMR", ddi: 95 },
        { country: "Burundi", iso: "BI / BDI", ddi: 257 },
        { country: "Camarões", iso: "CM / CMR", ddi: 237 },
        { country: "Cabo Verde", iso: "CV / CPV", ddi: 238 },
        { country: "Camboja", iso: "KH / KHM", ddi: 855 },
        { country: "Canadá", iso: "CA / CAN", ddi: 1 },
        { country: "Catar", iso: "QA / QAT", ddi: 974 },
        { country: "Chad", iso: "TD / TCD", ddi: 235 },
        { country: "Chile", iso: "CL / CHL", ddi: 56 },
        { country: "China", iso: "CN / CHN", ddi: 86 },
        { country: "Chipre", iso: "CY / CYP", ddi: 357 },
        { country: "Christmas Island", iso: "CX / CXR", ddi: 61 },
        { country: "Cingapura", iso: "SG / SGP", ddi: 65 },
        { country: "Colômbia", iso: "CO / COL", ddi: 57 },
        { country: "Comores", iso: "KM / COM", ddi: 269 },
        { country: "Coreia do Norte", iso: "KP / PRK", ddi: 850 },
        { country: "Coreia do Sul", iso: "KR / KOR", ddi: 82 },
        { country: "Costa do Marfim", iso: "CI / CIV", ddi: 225 },
        { country: "Costa Rica", iso: "CR / CRC", ddi: 506 },
        { country: "Croácia", iso: "HR / HRV", ddi: 385 },
        { country: "Cuba", iso: "CU / CUB", ddi: 53 },
        { country: "Dinamarca", iso: "DK / DNK", ddi: 45 },
        { country: "Djibouti", iso: "DJ / DJI", ddi: 253 },
        { country: "Dominica", iso: "DM / DMA", ddi: 1767 },
        { country: "Egito", iso: "EG / EGY", ddi: 20 },
        { country: "El Salvador", iso: "SV / SLV", ddi: 503 },
        { country: "Emirados Árabes Unidos", iso: "AE / ARE", ddi: 971 },
        { country: "Equador", iso: "EC / ECU", ddi: 593 },
        { country: "Eritreia", iso: "ER / ERI", ddi: 291 },
        { country: "Estónia", iso: "EE / EST", ddi: 372 },
        { country: "Espanha", iso: "ES / ESP", ddi: 34 },
        { country: "Etiópia", iso: "ET / ETH", ddi: 251 },
        { country: "Fiji", iso: "FJ / FJI", ddi: 679 },
        { country: "Finlândia", iso: "FI / FIN", ddi: 358 },
        { country: "França", iso: "FR / FRA", ddi: 33 },
        { country: "Gabão", iso: "GA / GAB", ddi: 241 },
        { country: "Gâmbia", iso: "GM / GMB", ddi: 220 },
        { country: "Banda de Gaza (Palestina)", iso: "", ddi: 970 },
        { country: "Geórgia", iso: "GE / GEO", ddi: 995 },
        { country: "Gana", iso: "GH / GHA", ddi: 233 },
        { country: "Gibraltar", iso: "GI / GIB", ddi: 350 },
        { country: "Grécia", iso: "GR / GRC", ddi: 30 },
        { country: "Groelândia", iso: "GL / GRL", ddi: 299 },
        { country: "Granada", iso: "GD / GRD", ddi: 1473 },
        { country: "Guam", iso: "GU / GUM", ddi: 1671 },
        { country: "Guatemala", iso: "GT / GTM", ddi: 502 },
        { country: "Guiana", iso: "GY / GUY", ddi: 592 },
        { country: "Guiné", iso: "GN / GIN", ddi: 224 },
        { country: "Guiné Equatorial", iso: "GQ / GNQ", ddi: 240 },
        { country: "Guiné-Bissau", iso: "GW / GNB", ddi: 245 },
        { country: "Haiti", iso: "HT / HTI", ddi: 509 },
        { country: "Honduras", iso: "HN / HND", ddi: 504 },
        { country: "Hong Kong", iso: "HK / HKG", ddi: 852 },
        { country: "Hungria", iso: "HU / HUN", ddi: 36 },
        { country: "Islândia", iso: "IS / ISL", ddi: 354 },
        { country: "Ilhas Cayman", iso: "KY / CYM", ddi: 1345 },
        { country: "Ilhas Cocos (Keeling)", iso: "CC / CCK", ddi: 61 },
        { country: "Ilha de Man", iso: "IM / IMN", ddi: 44 },
        { country: "Inglaterra (Reino Unido)", iso: "GB / GBR", ddi: 44 },
        { country: "Irã", iso: "IR / IRN", ddi: 98 },
        { country: "Iraque", iso: "IQ / IRQ", ddi: 964 },
        { country: "Irlanda", iso: "IE / IRL", ddi: 353 },
        { country: "Israel", iso: "IL / ISR", ddi: 972 },
        { country: "Itália", iso: "IT / ITA", ddi: 39 },
        { country: "Jamaica", iso: "JM / JAM", ddi: 1_876 },
        { country: "Japão", iso: "JP / JPN", ddi: 81 },
        { country: "Jordânia", iso: "JO / JOR", ddi: 962 },
        { country: "Cazaquistão", iso: "KZ / KAZ", ddi: 7 },
        { country: "Quénia (Kenya)", iso: "KE / KEN", ddi: 254 },
        { country: "Kiribati", iso: "KI / KIR", ddi: 686 },
        { country: "Kosovo", iso: null, ddi: 381 },
        { country: "Kuwait", iso: "KW / KWT", ddi: 965 },
        { country: "Quirguistão", iso: "KG / KGZ", ddi: 996 },
        { country: "Laos", iso: "LA / LAO", ddi: 856 },
        { country: "Letônia", iso: "LV / LVA", ddi: 371 },
        { country: "Líbano", iso: "LB / LBN", ddi: 961 },
        { country: "Lesoto", iso: "LS / LSO", ddi: 266 },
        { country: "Libéria", iso: "LR / LBR", ddi: 231 },
        { country: "Líbia", iso: "LY / LBY", ddi: 218 },
        { country: "Liechtenstein", iso: "LI / LIE", ddi: 423 },
        { country: "Lituânia", iso: "LT / LTU", ddi: 370 },
        { country: "Luxemburgo", iso: "LU / LUX", ddi: 352 },
        { country: "Macau", iso: "MO / MAC", ddi: 853 },
        { country: "Macedónia", iso: "MK / MKD", ddi: 389 },
        { country: "Madagáscar", iso: "MG / MDG", ddi: 261 },
        { country: "Malawi", iso: "MW / MWI", ddi: 265 },
        { country: "Malásia", iso: "MY / MYS", ddi: 60 },
        { country: "Maldivas", iso: "MV / MDV", ddi: 960 },
        { country: "Mali", iso: "ML / MLI", ddi: 223 },
        { country: "Malta", iso: "MT / MLT", ddi: 356 },
        { country: "Mauritânia", iso: "MR / MRT", ddi: 222 },
        { country: "Maurícia", iso: "MU / MUS", ddi: 230 },
        { country: "Mayotte", iso: "YT / MYT", ddi: 262 },
        { country: "México", iso: "MX / MEX", ddi: 52 },
        { country: "Micronésia", iso: "FM / FSM", ddi: 691 },
        { country: "Moldávia", iso: "MD / MDA", ddi: 373 },
        { country: "Mônaco", iso: "MC / MCO", ddi: 377 },
        { country: "Mongólia", iso: "MN / MNG", ddi: 976 },
        { country: "Montenegro", iso: "ME / MNE", ddi: 382 },
        { country: "Montserrat", iso: "MS / MSR", ddi: 1_664 },
        { country: "Marrocos", iso: "MA / MAR", ddi: 212 },
        { country: "Moçambique", iso: "MZ / MOZ", ddi: 258 },
        { country: "Namíbia", iso: "NA / NAM", ddi: 264 },
        { country: "Nauru", iso: "NR / NRU", ddi: 674 },
        { country: "Nepal", iso: "NP / NPL", ddi: 977 },
        { country: "Netherlands Antilles", iso: "AN / ANT", ddi: 599 },
        { country: "Nova Caledônia", iso: "NC / NCL", ddi: 687 },
        { country: "Nova Zelândia", iso: "NZ / NZL", ddi: 64 },
        { country: "Nicaragua", iso: "NI / NIC", ddi: 505 },
        { country: "Níger", iso: "NE / NER", ddi: 227 },
        { country: "Nigéria", iso: "NG / NGA", ddi: 234 },
        { country: "Niue", iso: "NU / NIU", ddi: 683 },
        { country: "Noruega", iso: "NO / NOR", ddi: 47 },
        { country: "Omã", iso: "OM / OMN", ddi: 968 },
        { country: "Países Baixos", iso: "NL / NLD", ddi: 31 },
        { country: "Paquistão", iso: "PK / PAK", ddi: 92 },
        { country: "Palau", iso: "PW / PLW", ddi: 680 },
        { country: "Panamá", iso: "PA / PAN", ddi: 507 },
        { country: "Papua-Nova Guiné", iso: "PG / PNG", ddi: 675 },
        { country: "Paraguai", iso: "PY / PRY", ddi: 595 },
        { country: "Peru", iso: "PE / PER", ddi: 51 },
        { country: "Filipinas", iso: "PH / PHL", ddi: 63 },
        { country: "Polónia", iso: "PL / POL", ddi: 48 },
        { country: "Polinésia Francesa", iso: "PF / PYF", ddi: 689 },
        { country: "Portugal", iso: "PT / PRT", ddi: 351 },
        { country: "Porto Rico", iso: "PR / PRI", ddi: 1 },
        { country: "República do Congo", iso: "CG / COG", ddi: 242 },
        { country: "República Democrática do Congo", iso: "CD / COD", ddi: 243 },
        { country: "República Centro-Africana", iso: "CF / CAF", ddi: 236 },
        { country: "República Checa", iso: "CZ / CZE", ddi: 420 },
        { country: "República Dominicana", iso: "DO / DOM", ddi: 1809 },
        { country: "Roménia", iso: "RO / ROU", ddi: 40 },
        { country: "Ruanda", iso: "RW / RWA", ddi: 250 },
        { country: "Rússia", iso: "RU / RUS", ddi: 7 },
        { country: "Saint Barthelemy", iso: "BL / BLM", ddi: 590 },
        { country: "Samoa", iso: "WS / WSM", ddi: 685 },
        { country: "Samoa Americana", iso: "AS / ASM", ddi: 1684 },
        { country: "San Marino", iso: "SM / SMR", ddi: 378 },
        { country: "São Tomé e Príncipe", iso: "ST / STP", ddi: 239 },
        { country: "Senegal", iso: "SN / SEN", ddi: 221 },
        { country: "Sérvia", iso: "RS / SRB", ddi: 381 },
        { country: "Serra Leoa", iso: "SL / SLE", ddi: 232 },
        { country: "Seychelles", iso: "SC / SYC", ddi: 248 },
        { country: "Eslováquia", iso: "SK / SVK", ddi: 421 },
        { country: "Eslovênia", iso: "SI / SVN", ddi: 386 },
        { country: "Somália", iso: "SO / SOM", ddi: 252 },
        { country: "Sri Lanka", iso: "LK / LKA", ddi: 94 },
        { country: "Saint Helena", iso: "SH / SHN", ddi: 290 },
        { country: "Saint Kitts and Nevis", iso: "KN / KNA", ddi: 1869 },
    ])

function gerarLink() {
    const codigoPais = document.getElementById('codigoPais').value;
    const numero = document.getElementById('numero_gerador').value;
    const mensagem = encodeURIComponent(document.getElementById('mensagem_gerador').value);

    if (!numero || numero.length > 11 || numero.length < 11) {
        alert('Por favor, insira um número de telefone válido com no máximo 11 dígitos.');
        return;
    }

    if (!mensagem.trim()) {
        alert('Por favor, insira uma mensagem.');
        return;
    }
    const whatsappLink = `https://wa.me/+${codigoPais}${numero}?text=${mensagem}`
    document.querySelector('#botaoCopiar').style.display = 'block';

    document.getElementById('diVResposta').innerHTML = `
        <p class="text-light">Link gerado: <a href="${whatsappLink}" id="linkGerado" target="_blank" class="text-light">${whatsappLink}</a></p>
    `;
}

function copiarLink(){
    const linkTexto = document.getElementById('linkGerado');
    navigator.clipboard.writeText(linkTexto.textContent).then(() => {
        alert('Link copiado para a área');
    }).catch((error) => {
        console.error('Error copying link to clipboard:', error);
    });
}

function resetar() {
    document.getElementById('codigoPais').value = "+55"; // Define o valor padrão
    document.getElementById('numero_gerador').value = "";
    document.getElementById('mensagem_gerador').value = "";
    document.getElementById('diVResposta').innerHTML = ""; // Limpa o link gerado, se houver
}
</script>

<style scoped>
/* Estilização do contêiner principal */
#container-gerador-link {
  max-width: 600px;
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Estilização do corpo do cartão */
#container-gerador-link .card-body {
  padding: 20px;
}

/* Título do cartão */
#container-gerador-link .card-title {
  font-size: 1.5em;
  margin-bottom: 10px;
  text-align: center;
  color: #007bff;
}

/* Texto do cartão */
#container-gerador-link .card-text {
  margin-bottom: 20px;
  text-align: center;
  color: #666;
}

/* Estilização dos labels */
#container-gerador-link .form-label {
  font-weight: bold;
}

/* Caixa de seleção */
#container-gerador-link .form-select {
  padding: 10px;
  border-radius: 5px;
}

/* Caixa de entrada de texto */

</style>
<template>
 <div id="container-gerador-link" class="pointer">
            <div class="card-body">
                <div class="m-3">
                    <h5 class="card-title">Gere um Link Personalizado para WhatsApp</h5>
                    <p class="card-text">Crie um link com uma mensagem predefinida para enviar via WhatsApp.</p>
                </div>

                 <div class="mb-3">
                    <label for="codigoPais" class="form-label">Código do País *</label>
                    <select title="Selecione" id="codigoPais" class="color-btn">
                        <option v-for="country in countryCodes" :value="country.ddi" :selected="country.ddi === 55">
                            {{ country.country }} (+{{ country.ddi }})
                        </option>
                    </select>
                </div>

                <div class="mb-3">
                    
                </div>
                    <div class="input-group-suite">
                        <label for="numero_gerador">Número de Telefone *</label>
                        <label class="form-text"><b>Por exemplo:  61912345678</b></label>
                        <label class="form-text"><b>Não pode ter espaços</b></label>
                        <input 
                            type="text"    
                            id="numero_gerador"   
                            oninput="validateNumber(this)" 
                            required 
                            maxlength="11" 
                            placeholder="61912345678" 
                        />
                    </div>
                    <div class="input-group-suite">
                         <label for="mensagem_gerador"><b>Mensagem *</b></label>
                        <input 
                        type="text" 
                        id="mensagem_gerador" 
                        placeholder="Digite sua mensagem" 
                        required
                    />
                    </div>

                <div class="d-flex gap-2 mt-3">
                    <button 
                        class="btn btn-outline-secondary" 
                        @click="resetar()"
                    >
                        Redefinir
                    </button>
                    <button 
                        class="btn btn-primary" 
                        @click="gerarLink()"
                    >
                        Obter Link
                    </button>
                    <button id="botaoCopiar" class="btn btn-primary" style="display:none" @click="copiarLink">
                        Copiar link
                    </button>
                </div>

                <div id="diVResposta" class="mt-4"></div>
            </div>
        </div>

</template>