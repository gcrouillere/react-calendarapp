class AppointmentsController < ApplicationController
  def index
    @appointment = Appointment.new
    @appointments = Appointment.order(apt_time: :asc)
    @authenticity_token = form_authenticity_token
    respond_to do |format|
      format.html
      format.json {render json: {appointments: @appointments, authenticity_token: @authenticity_token}}
    end
  end

  def create
    @appointment = Appointment.new(appointment_params)
    if @appointment.save
      render json: @appointment
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  def show
    @appointment = Appointment.find(params[:id])
    render json: @appointment
  end

  def edit
    render :index
  end

  def update
    @appointment = Appointment.find(params[:id])
    if @appointment.update(appointment_params)
      render json: @appointment
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  private

  def appointment_params
    params.require(:appointment).permit(:title, :apt_time)
  end
end
