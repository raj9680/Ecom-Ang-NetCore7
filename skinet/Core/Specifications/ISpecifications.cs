using System.Linq.Expressions;

namespace Core.Specifications
{
    public interface ISpecifications<T>
    {
        Expression<Func<T, bool>> Criteria {get; } // Func<type, returnTypeOfFun> Criteria = conditions
        List<Expression<Func<T, object>>> Includes {get; }

        // For Sorting
        Expression<Func<T, object>> OrderBy {get; }
        Expression<Func<T, object>> OrderByDescending {get; }

        // For Pagination
        int Take { get; } // Take certain amount of products
        int Skip { get; } // Skip certain amount of products
        bool IsPagingEnabled { get; }
    }
}