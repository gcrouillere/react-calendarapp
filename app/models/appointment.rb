class Appointment < ApplicationRecord
   validate do
      self.errors[:apt_time] << "Date must be in a valid date format" unless (self.apt_time.is_a?(Time) || self.apt_time.is_a?(Date))
   end
end
