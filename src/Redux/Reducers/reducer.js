const initialState = {
  input: "",
  previousInputNum: "",
  operator: ""
};


export const reducer = (state = initialState, action) => {
  switch(action.type){
      case 'ADD_ELEM':
          return{
              ...state,
              value: state.value == 0 ? action.payload : state.value + action.payload
          }
      case 'CLEAR':
          return{
              ...state,
              value: 0
          }
      case 'EQUAL':
          return{
              ...state,
              value: eval(action.payload)
          }
      default:
          return state;
  }
}
