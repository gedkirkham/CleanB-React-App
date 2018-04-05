using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cleaning_rota
{
    class Program
    {
        static void Main(string[] args)
        {
            //add rooms
            build_location _build_location = new build_location();

            Console.WriteLine("How many rooms are there to clean?");
            _build_location.room_count(Console.ReadLine());

            for (int i = 0; i < _build_location.get_room_count(); i++)
            {
                String room_name = _build_location.add_room(Console.ReadLine());
                Console.WriteLine("How frequent should " + room_name + " be cleaned? Once a week/once every two weeks/once every three weeks etc.");

                bool validate_room_frequency = false;
                while (!validate_room_frequency)
                {
                    Console.WriteLine("Every (weeks): ");
                    validate_room_frequency = _build_location.validate_room_frequency(Console.ReadLine());
                }

            }

            //add users
            add_cleaners _add_cleaners = new add_cleaners();
            Console.WriteLine("How many cleaners are there?");
            _add_cleaners.cleaner_count(Console.ReadLine());

            for (int i = 0; i < _add_cleaners.get_cleaner_count(); i++)
            {
                _add_cleaners.cleaners_name(Console.ReadLine());
            }

            //decide if users are exempt from certain rooms
            cleaners_exemption _cleaners_exemption = new cleaners_exemption();

            Console.WriteLine("Are cleaners exempt from any particular rooms?");
            bool users_exempt = _cleaners_exemption.true_false_response_validation(Console.ReadLine());

            while (users_exempt)
            {
                Console.WriteLine("Which user is exempt?");
                Console.WriteLine(_add_cleaners.print_list());

                bool cleaner_validation = false;
                while (!cleaner_validation)
                {
                    cleaner_validation = _add_cleaners.validate_cleaner(Console.ReadLine()); //add exception message
                }

                bool more_exempt = true;
                while (more_exempt)
                {
                    Console.WriteLine("What room are they exempt from?");
                    Console.WriteLine(_build_location.print_list());

                    bool room_validation = false;
                    while (!room_validation)
                    {
                        room_validation = _build_location.validate_room(Console.ReadLine()); //add exception message
                    }

                    Console.WriteLine("Any more rooms?");
                    more_exempt = _cleaners_exemption.true_false_response_validation(Console.ReadLine());
                }

                Console.WriteLine("Any more cleaners exempt?");
                users_exempt = _cleaners_exemption.true_false_response_validation(Console.ReadLine());
            }

            //ask what weekend to start 
            rota_calendar _rota_calendar = new rota_calendar();

            bool validate_calendar_input = false;
            while (!validate_calendar_input)
            {
                Console.WriteLine("When should this rota start? dd/mm/yyyy");
                _rota_calendar.validate_calendar_input();
            }

            //assign people to rooms
            rota_assignment = _rota_assignment = new rota_assignment();

            _rota_assignment.print_rota(); //try and avoid a single person cleaning a single room each week //highlight any clashes

            //allow person to remove themselves
            //allow person to amend their name
        }
    }
}
