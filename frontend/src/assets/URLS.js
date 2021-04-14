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
    guest_detail: `${baseurl}/bookings/guests/`,
    available_rooms: `${baseurl}/bookings/rooms/available/`,
    create_guest: `${baseurl}/bookings/guests/`,
    make_booking: `${baseurl}/bookings/add/`,
    booking_table: `${baseurl}/bookings/rooms/bookings/`,
    check_in: `${baseurl}/bookings/checkin/`,
    check_out: `${baseurl}/bookings/checkout/`,

    //food-related
    food_list: `${baseurl}/food/allfood/`,
    food_order: `${baseurl}/food/orders/`,
    food_create: `${baseurl}/food/create/`,
    food_update: `${baseurl}/food/update/`,
    food_orders: `${baseurl}/food/orders/`,
    food_order_complete: `${baseurl}/food/order/complete/`,
    food_order_cancel: `${baseurl}/food/order/cancel/`,
}