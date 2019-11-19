export default {
  data() {
    return {
      accountList: []
    }
  },
  mounted() {
    this.commoncorporationSelectForJxc()
  },
  methods: {
    commoncorporationSelectForJxc() {
      this.$api.seeBaseinfoService.commoncorporationSelectForJxc().then(res => {
        this.accountList = res.data || []
      })
    }
  }
}
