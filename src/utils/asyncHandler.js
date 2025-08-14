const asyncHandler =(reqestHandler) =>{
    (req, res, next)=>{
        Promise.resolve(req, res).
        catch((err)=> next(err))
    }
}

export {asyncHandler}


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
