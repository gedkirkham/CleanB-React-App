using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Program;

namespace cleaning_rota.test.unit
{
    [TestClass]
    public class build_location_test
    {
        private readonly build_location _build_location = new build_location();

        [TestMethod]
        [Exception(Type(Exception))]//unsure how to properly do this
        public void room_count_negative_test()
        {
            _build_location.room_count("*");
            Assert.Equals(Exception);
        }

        [TestMethod]
        public void number_in_number_out()
        {
            int result = _build_location.room_count("4");
            Assert.Equals(4,result);
        }

        [TestMethod]
        public void string_in_number_out()
        {
            int result = _build_location.room_count("Four");
            Assert.Equals(4, result);
        }

        [TestMethod]
        public void add_room()
        {
            String room_name = _build_location.add_room("Room1");
            Assert.Equals("Room1", room_name);
        }

        [TestMethod]
        public void true_room_frequency()
        {
            bool validate_room_frequency = _build_location.validate_room_frequency("2");
            Assert.Equals(validate_room_frequency, true);
        }

        [TestMethod]
        public void false_room_frequency()
        {
            bool validate_room_frequency = _build_location.validate_room_frequency("twoo");
            Assert.Equals(validate_room_frequency, false);
        }
    }
}