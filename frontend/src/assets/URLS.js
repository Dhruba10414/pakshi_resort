const baseurl = "https://api.pakshiresort.com"
export const api = {    
    // auth-related
    refresh: `${baseurl}/api/token/refresh/`,
    login: `${baseurl}/api/token/`,
    logout: `${baseurl}/api/logout/`,
    get_all_users: `${baseurl}/api/users/`,
    get_user: `${baseurl}/api/user/`,
    register_user: `${baseurl}/api/signup/`,
    disable_user: `${baseurl}/api/remove/`,
    
    // room-related
    rooms: `${baseurl}/bookings/rooms/`,

    // bookings - related
    create_guest: `${baseurl}/bookings/guests/`, //post
    guest_detail: `${baseurl}/bookings/guests/`, // get
    available_rooms: `${baseurl}/bookings/rooms/available/`, //get
    make_booking: `${baseurl}/bookings/add/`, // post
    booking_table: `${baseurl}/bookings/rooms/bookings/`, // get
    requested_booking_table: `${baseurl}/bookings/guest_requests/`, // get
    check_in: `${baseurl}/bookings/checkin/`, // post
    check_out: `${baseurl}/bookings/checkout/`, // post
    cancel_booking: `${baseurl}/bookings/cancel/`, // post
    request_for_booking: `${baseurl}/bookings/guest_requests/add/`, // post
    delete_fraud_guest: `${baseurl}/bookings/guests/frauds/`, //delete
    accept_booking_request: `${baseurl}/bookings/guest_requests/`, //post

    //food-related
    food_list: `${baseurl}/food/allfood/`,
    food_order: `${baseurl}/food/orders/`,
    food_create: `${baseurl}/food/create/`,
    food_update: `${baseurl}/food/update/`,
    food_orders: `${baseurl}/food/orders/`,
    food_order_complete: `${baseurl}/food/order/complete/`,
    food_order_cancel: `${baseurl}/food/order/cancel/`,

    // payment
    guest_invoice: `${baseurl}/invoices/resort-invoice/`,
    food_invoice: `${baseurl}/food/invoice/`,
    invoice_room_summary: `${baseurl}/invoices/resort-short-invoice/`,
    invoice_food_summry: `${baseurl}/food/invoice-summary/`,
    payment_recieve: `${baseurl}/invoices/payments/`,
}