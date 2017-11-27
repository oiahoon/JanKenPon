class PunchRecordsController < ApplicationController

  PER_PAGE = 50

  def index
    records = PunchRecord.last(PER_PAGE)

  end

  format_record = Struct.new(:user_a, :user_b, :result) do
    def to_object
      {
        "rand": (3 + rand(3)),
        "text": "#{user_a}"
      }
    end
  end

end
