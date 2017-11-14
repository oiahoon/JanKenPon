class PunchRecordSerializer < ActiveModel::Serializer
  attributes :id, :punch_id, :rival_punch_id, :result
end
