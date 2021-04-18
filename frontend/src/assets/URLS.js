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
    create_guest: `${baseurl}/bookings/guests/`,
    guest_detail: `${baseurl}/bookings/guests/`,
    available_rooms: `${baseurl}/bookings/rooms/available/`,
    make_booking: `${baseurl}/bookings/add/`,
    booking_table: `${baseurl}/bookings/rooms/bookings/`,
    requested_booking_table: `${baseurl}/bookings/guest_requests/`,
    check_in: `${baseurl}/bookings/checkin/`,
    check_out: `${baseurl}/bookings/checkout/`,
    cancel_booking: `${baseurl}/bookings/cancel/`,

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