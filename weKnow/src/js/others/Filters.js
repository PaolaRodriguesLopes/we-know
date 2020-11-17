const moment = require("moment");

class Filters {
    static processRole(value) {
       switch(value) {
            case 0: default: {
                return 'Usuário Comum';
            }
                
            case 1: {
                return 'Administrador';
            }
                
            case 2: {
                return 'Professor(a)';
            }
        }
    }

    static processArticleStatus(value) {
       switch(value) {
            case 0: default: {
                return 'Aguardando Aprovação';
            }
                
            case 1: {
                return 'Aprovado';
            }
                
            case 2: {
                return 'Rejeitado';
            }
        }
    }

    static articleStatusDescriptionToValue(value) {
       switch(value) {
            case 'waiting-for-approval': default: {
               return 0;
            }
                
            case 'approved': {
               return 1;
            }
                
            case 'refused': {
               return 2;
            }
        }
    }

    static formatDatetime(value) {
        return moment(value).format('DD/MM/YYYY hh:mm');
    }
}

module.exports = Filters;