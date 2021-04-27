const baseurl = "https://api.pakshiresort.com"
export const api = {    
    // auth-related
    get_all_users: `${baseurl}/api/users/`, // get
    get_user: `${baseurl}/api/user/`, // get
    refresh: `${baseurl}/api/token/refresh/`, // post
    login: `${baseurl}/api/token/`, // post
    logout: `${baseurl}/api/logout/`, // post
    register_user: `${baseurl}/api/signup/`, // post
    send_reset_mail: `${baseurl}/auth/users/reset_password/`, // post
    reset_password: `${baseurl}/auth/users/reset_password_confirm/`, // post
    change_password: `${baseurl}/api/change_password/`, // post
    disable_user: `${baseurl}/api/remove/`, // put
    delete_user: `${baseurl}/api/delete/`,
    
    // room-related
    rooms: `${baseurl}/bookings/rooms/`, // get

    // bookings - related
    booking_table: `${baseurl}/bookings/rooms/bookings/`, // get
    requested_booking_table: `${baseurl}/bookings/guest_requests/`, // get
    guest_detail: `${baseurl}/bookings/guests/`, // get
    available_rooms: `${baseurl}/bookings/rooms/available/`, //get
    make_booking: `${baseurl}/bookings/add/`, // post
    create_guest: `${baseurl}/bookings/guests/`, //post
    check_in: `${baseurl}/bookings/checkin/`, // post
    check_out: `${baseurl}/bookings/checkout/`, // post
    cancel_booking: `${baseurl}/bookings/cancel/`, // post
    request_for_booking: `${baseurl}/bookings/guest_requests/add/`, // post
    accept_booking_request: `${baseurl}/bookings/guest_requests/`, //post
    delete_fraud_guest: `${baseurl}/bookings/guests/frauds/`, //delete


    //food-related
    food_list: `${baseurl}/food/allfood/`, // get
    food_orders: `${baseurl}/food/orders/`, // get
    food_order: `${baseurl}/food/orders/`, // post
    food_create: `${baseurl}/food/create/`, // post
    food_order_complete: `${baseurl}/food/order/complete/`, // post
    food_order_cancel: `${baseurl}/food/order/cancel/`, // post
    food_update: `${baseurl}/food/update/`, // post

    // ticket-related
    buy_ticket: `${baseurl}/tickets/sells/`, //post

    // payment
    guest_invoice: `${baseurl}/invoices/resort-invoice/`, // get
    food_invoice: `${baseurl}/food/invoice/`, // get
    invoice_room_summary: `${baseurl}/invoices/resort-short-invoice/`, // get
    invoice_food_summry: `${baseurl}/food/invoice-summary/`, // get
    payment_recieve: `${baseurl}/invoices/payments/`, // post

    // stastics
    resort_stastics: `${baseurl}/invoices/analytics/`, // get
    ticket_stastics: `${baseurl}/tickets/analytics/`, // get
    food_stastics: `${baseurl}/food/analytics/`, // get
    resort_csv: `${baseurl}/invoices/resort-logs/`, // get
    ticket_csv: `${baseurl}/tickets/logs/`, //get
    food_csv: `${baseurl}/food/food-log/`, // get

}