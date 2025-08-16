const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
};

export { asyncHandler };



// const asyncHandler = () =>{}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}





// const asyncHandler = (fn)=> async (req, res, next)=>{
//     try {
//         await function(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }
