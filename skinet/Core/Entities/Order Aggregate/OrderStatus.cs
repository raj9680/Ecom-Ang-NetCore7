using System.Runtime.Serialization;

namespace Core.Entities.Order_Aggregate
{
    public enum OrderStatus
    {
        [EnumMember(Value = "Pending")]
        Pending, /// 0 default value of enum

        [EnumMember(Value = "Payment Received")]
        PaymentReceived, /// 1 default value of enum

        [EnumMember(Value = "PaymentFailed")]
        PaymentFailed  /// 2 default value of enum
    }
}
