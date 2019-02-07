class Appointment < ApplicationRecord

  validates :title, presence: true
  validates :title, length: {minimum: 3}
  validate do
    self.errors[:apt_time] << "Date must be in a valid date format" unless (self.apt_time.is_a?(Time) || self.apt_time.is_a?(Date))
    self.errors[:apt_time] << "Date must be in the future" unless self.apt_time.present? && self.apt_time > Time.now
  end

end
