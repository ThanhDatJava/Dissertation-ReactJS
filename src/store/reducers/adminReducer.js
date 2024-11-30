// import actionTypes from "../actions/actionTypes";

// const initialState = {
//   isLoandingGender: false,
//   genders: [],
//   roles: [],
//   positions: [],
// };

// const adminReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case actionTypes.FETCH_GENDER_START:
//       let copyState = { ...state };
//       copyState.isLoandingGender = true;
//       console.log("fire fetch gender start: ", action);

//       return {
//         ...copyState,
//       };
//     case actionTypes.FETCH_GENDER_SUCCESS:
//       state.genders = action.data;
//       state.isLoandingGender = false;
//       console.log("fire fetch gender success: ", action);
//       return {
//         ...state,
//       };

//     case actionTypes.FETCH_GENDER_FAILDED:
//       console.log("fire fetch gender faided: ", action);
//       state.isLoandingGender = false;
//       state.genders = [];

//       return {
//         ...state,
//       };

//     default:
//       return state;
//   }
// };

// export default adminReducer;

import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topDoctors: [],
  allDoctors: [],
  allScheduleTime: [],

  allRequiredDoctorInfor: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    //gender
    case actionTypes.FETCH_GENDER_START:
      return {
        ...state,
        isLoadingGender: true,
      };

    case actionTypes.FETCH_GENDER_SUCCESS:
      return {
        ...state,
        genders: action.data,
        isLoadingGender: false,
      };

    case actionTypes.FETCH_GENDER_FAILED:
      return {
        ...state,
        genders: [],
        isLoadingGender: false,
      };

    //position
    case actionTypes.FETCH_POSITION_SUCCESS:
      return {
        ...state,
        positions: action.data,
      };

    case actionTypes.FETCH_GENDER_FAILED:
      return {
        ...state,
        positions: [],
      };

    //role
    case actionTypes.FETCH_ROLE_SUCCESS:
      return {
        ...state,
        roles: action.data,
      };

    case actionTypes.FETCH_ROLE_FAILED:
      return {
        ...state,
        roles: [],
      };

    // Get All User
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_FAILDED:
      state.users = [];
      return {
        ...state,
      };

    //get top doctors
    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
      state.topDoctors = action.dataDoctors;
      return {
        ...state,
      };

    case actionTypes.FETCH_TOP_DOCTORS_FAILDED:
      state.topDoctors = [];
      return {
        ...state,
      };

    //get all doctors
    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      state.allDoctors = action.dataDr;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_DOCTORS_FAILDED:
      state.allDoctors = [];
      return {
        ...state,
      };

    //get all time schedule
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      state.allScheduleTime = action.dataTime;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED:
      state.allScheduleTime = [];
      return {
        ...state,
      };

    //get all required infor
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCES:
      state.allRequiredDoctorInfor = action.data;
      return {
        ...state,
      };

    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILDED:
      state.allRequiredDoctorInfor = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
