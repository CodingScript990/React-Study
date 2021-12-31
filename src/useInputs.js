import { useReducer, useCallback } from 'react';

function reducer(state, action) {
    // change
    // reset
    switch(action.type) {
        case 'CHANGE' : 
            return {
                ...state,
                [action.name] : action.value,
            };

        case 'RESET' : 
            return Object.keys(state).reduce( (acc,current) => {
                acc[current] = '';
                return acc;
        }, {} );
        default : 
            return state;
    }
};

function useInputs(initialForm) { // 해당 Parameter initial value
    
    /*
    [useState 형태]

    const [form, setForm] = useState(initialForm); // form state(상태)
    const onChange = useCallback( e => { // value의 값이 change되는 곳(변화)
        const {name, value} = e.target; // event가 발생될 variables => e.target
        setForm(form => ({...form, [name] : value})); // form안에 name, value의 값을 저장한다.
    }, []);
    const reset = useCallback( () => setForm(initialForm), [initialForm]); // reset할 곳에 해당 initialfrm value의 값을 받아온다.(초기화)

    return [form, onChange, reset]; // 값을 반환해준다.(form, onChange, reset)
    */

    // reducer 형태
    const [form, dispatch] = useReducer(reducer, initialForm);

    // change
    const onChange = useCallback( e => {
        const {name, value} = e.target;
        dispatch({type : 'CHANGE', name, value}, []);
    });

    const reset = useCallback( () => dispatch({type : 'RESET'}), [] );
    return [form, onChange, reset];
};

export default useInputs; 