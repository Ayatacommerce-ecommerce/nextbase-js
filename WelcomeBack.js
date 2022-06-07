class WelcomeBack extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: 'J',
            apppVersion: '1'
        }
    }

    render(){
        country_code = localStorage.getItem('Country_code')
        country_sku = localStorage.getItem('Country_sku')
        seller_type = localStorage.getItem('seller_type')
        console.log("react output",country_code)
        if (country_code) {
            $('.featerdproduct').each(async function(i, item) {
                var sku = $(item).data('sku');
                var prid = $(item).data('product-id');
                console.log("react output 2",sku,prid)
            })
        }
        return(
            <>
                <h2>Hello {this.state.name || 'Friend'}! Welcome Back.</h2>
                {
                    this.state.apppVersion && this.state.apppVersion < 2
                    ? <p>Your app is out of date. Please download the new version and take a look at all the new features.</p> 
                    : ''
                }
                <CoolButton customText={this.state.apppVersion && this.state.apppVersion < 2 ? 'Download v2' : 'Download'} />
            </>
        )
    }


}