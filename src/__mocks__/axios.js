export default {
    get : jest.fn().mockImplementation(()=>Promise.resolve({data:{}}))
    // Promise.reject("error"))
    // get : jest.fn(()=>Promise.resolve({data:{}}))
}