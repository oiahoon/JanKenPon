class PunchRecordsController < ApplicationController

  PER_PAGE = 50

  def index
    resp = Rails.cache.fetch(["punch_record", "bullets", "v1"], expired_in: 1.minute) do
      records = PunchRecord.includes({punches: [:user]}).last(PER_PAGE)
      bullets = []
      records.each do |record|
        punches = record.punches
        bullets << RecordFormator.new(
          punches.first.user.username,
          punches.last.user.username,
          punches.first.pattern,
          punches.first.result
        ).to_bullet
      end
      bullets
    end
    render json: resp, adapter: nil
  end

  RecordFormator = Struct.new(:user_a, :user_b, :pattern, :result) do
    def to_bullet
      pattern_string = I18n.t("punch_record.patterns.#{pattern}").values.sample
      {
        "rand": (2 + rand(4)),
        "text": I18n.t("punch_record.bullet_#{result}", \
                user_a: user_a, user_b: user_b, pattern: pattern_string)
      }
    end
  end

end
