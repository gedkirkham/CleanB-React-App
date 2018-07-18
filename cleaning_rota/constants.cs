using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cleaning_rota
{
    class Constants
    {
        public const string YN = "Y/N";
        public const string YN_brackets = "(Y/N): ";
        public const string option_was_not_recognised = "Option was not recognised. Please try again.";
        public const string option_was_not_a_number = "Option was not a number. Please try again.";
        public const string option_was_out_of_range = "Option was out of range. Please try again.";
        public const string main_menu = ". Main menu";
        public const string add_cleaner = ". Add cleaner";
        public const string select = "Select: ";
        public const string nothing_returned = "You do not have any {0}. Would you like to add some? {1}";
        public const string cleaners_and_rooms_required = "You need to add cleaners and rooms to this house before you can view the calendar.";
        public const string cleaners_required = "You need to add cleaners before you can view the calendar.";
        public const string rooms_required = "You need to create rooms before you can view the calendar.";

        public const string main_menu_text = @"Main Menu:
1. Cleaners
2. Rooms
3. Calendar
4. Logout";

        public const string cleaning_frequency_menu_text = @"How frequently should {0} be cleaned?
1. Weekly
2. Thrice-monthly
3. Semi-monthly
4. Monthly
{1}";

        public const string user_menu = @":
1. Exempt from room
2. Amend name
3. Delete user
4. Main menu
{0}";
    }
}
