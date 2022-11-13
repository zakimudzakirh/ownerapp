export default {
    primary: '#36A388',
    black: '#404040',
    white: '#FFFFFF',
    gray: '#A1AFC3',
    accent: '#7C42FF',
    background: '#E5E5E5',
    opacityColor: (hex, opacity) => {
        var c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+opacity+')';
        }
        throw new Error('Bad Hex');
    }
}