export const getAddressTitle = address => {
    return `${address.BuildingNo}  ${address.Street}  ${address.Remark}  ${address.RowNo} ${address.FlatNo} `
}
export const init  =  async ctx =>{
    await ctx.$store.dispatch('global/getSettings')
    .then(async () => {
        await ctx.$store.dispatch('group/featured' )
        if(ctx.$auth.loggedIn){
            await ctx.$store.dispatch('cart/get')
            await ctx.$store.dispatch('wishlist/get')
        }
      ctx.loading = false
    })
    
  }

export const addParamsToLocation = (params , store) => {
    store.dispatch('product/get' , params)
    history.pushState(
        {},
        null,
        this.$route.path +
        '?' +
        Object.keys(params)
            .map(key => {
            return (
                encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
            )
            })
            .join('&')
    )
    window.scrollTo({ top:0, behavior: 'smooth'});
}