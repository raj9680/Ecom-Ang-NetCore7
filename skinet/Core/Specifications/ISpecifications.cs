using System.Linq.Expressions;

namespace Core.Specifications
{
    public interface ISpecifications<T>
    {
        Expression<Func<T, bool>> Criteria {get; } // Func<type, returnTypeOfFun> Criteria = conditions
        List<Expression<Func<T, object>>> Includes {get; }
    }
}