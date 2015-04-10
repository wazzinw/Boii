/**
 * Created by wazzinw on 2/21/15 AD.
 */

//Show order in month
var orderByDate = function(month){
    var data = {};
    var orders = Orders.find({
        created_at: {
            //query for month 3
            $gt: new Date(2015, month-1, 1),
            $lte: new Date(2015, month, 0)
        },
        restaurant_id: Meteor.user().profile.restaurant_id
    }, {sort: {created_at: 1}} ); //ascending

    console.log(orders.fetch());

    data.series = [[]];

    var noOfDays = new Date(2015,month,0).getDate()

    data.labels = _(noOfDays).times( function(n) {
        data.series[0][n] = 0;
        n++;
        return n;
    });

    orders.forEach(function(order, index, array){
        var date = order.created_at.getDate();
        data.series[0][date-1]++;
    });
        new Chartist.Bar('#orderByDate', data);
}


//Date selector
Template.reportPage.onRendered(function(){
    $('#orderTimeDatepicker').datepicker();
    Meteor.subscribe("orders",[],{
        onReady: function(){
            orderByDate(1);
        }
    })
});


Template.reportPage.events({

    //
    'change #orderMonthSelector': function (event) {
        // ...
        var select = $('#orderMonthSelector').val();
        console.log("selector change to " +select);
        orderByDate(select);
    },

    //
    'change #orderTimeDatepicker': function(event){
        var select = $("#orderTimeDatepicker").val();
        console.log("orderTimeDatepicker = " + select);
        var date  = select.split('/');
        var day = Number(date[0]);
        var month = Number(date[1]) -1;
        var year = Number(date[2]);

        var gteDate = new Date(year, month, day);
        var ltDate = new Date(year, month, day+1);
        console.log("btw: "+gteDate+" and " +ltDate);
        var orders = Orders.find({
            created_at: {
                $gte: gteDate,
                $lt: ltDate
            },
            restaurant_id: Meteor.user().profile.restaurant_id
        });
        console.log(orders.fetch());
        var data = {};
        data.series = [[]];
        data.labels = [];

        _(24).times(function(n){
            data.series[0][n] = 0; //initialize
            data.labels[n] = n+":00";
        });

        orders.forEach(function(value){
            data.series[0][value.created_at.getHours()]++;
        })

        new Chartist.Bar('#orderByTime', data);
    }
});



Template.reportPage.helpers({
    orderVsTime: function(){
        var data = {};
        var orders = Orders.find({
            created_at: {
                //query for month 3
                $gt: new Date(2015, 2, 0),
                $lte: new Date(2015, 3, 0)
            }
        }, {sort: {created_at: 1}} ).fetch(); //ascending

        data.series = [[]];

        var noOfDays = new Date(2015,3,0).getDate()

        data.labels = _(noOfDays).times( function(n) {
            data.series[0][n] = 0;
            return n+1;
        });

        orders.forEach(function(order, index, array){
            var date = order.created_at.getDate();
            data.series[0][date-1]++;
        });

        new Chartist.Bar('#orderVsTime', data);
        return data;
    }
});




